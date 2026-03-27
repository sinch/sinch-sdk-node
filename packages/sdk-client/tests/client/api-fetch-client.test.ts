jest.mock('node-fetch', () => {
  const actual = jest.requireActual('node-fetch');
  return {
    __esModule: true,
    default: jest.fn(),
    Headers: actual.Headers,
    Response: actual.Response,
  };
});

import { RequestPluginEnum } from '../../src/plugins/core/request-plugin';
import { ApiFetchClient, PaginationEnum, Oauth2TokenRequest } from '../../src';
import fetch, { Headers, Response } from 'node-fetch';

const mockedFetch = fetch as unknown as jest.Mock;

describe('manageExpiredToken', () => {

  let token: string | undefined;
  let apiClient: ApiFetchClient;
  let oauth2Plugin: any;

  beforeEach(() => {
    jest.clearAllMocks();

    oauth2Plugin = {
      getName: () => RequestPluginEnum.OAUTH2_TOKEN_REQUEST,
      invalidateToken: jest.fn(() => {
        token = undefined;
      }),
      load: () => ({
        transform: async (options: any) => {
          if (!token) {
            token = 'new-token';
          }
          const headers = new Headers(options.headers);
          headers.set('Authorization', `Bearer ${token}`);
          return { ...options, headers };
        },
      }),
    };

    apiClient = new ApiFetchClient({
      requestPlugins: [oauth2Plugin],
    });

    token = 'expired-token';
  });

  it('should regenerate JWT and retry the call after token expiration', async () => {

    // Fake fetch simulation (first call 401, second call 200)
    mockedFetch.mockResolvedValueOnce(
      new Response('', {
        status: 401,
        headers: { 'www-authenticate': 'token expired' },
      }),
    );
    // Second call — success
    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({ data: 'success' }), {
        status: 200,
        headers: {},
      }),
    );

    const headers = new Headers({ Authorization: `Bearer ${token}` });
    const requestOptions = {
      method: 'GET',
      headers,
      hostname: 'https://api.example.com',
      path: '/endpoint',
    };

    const result = await apiClient.processCall<{ data: string }>({
      url: 'https://api.example.com/endpoint',
      requestOptions,
      apiName: 'TestAPI',
      operationId: 'testOperation',
    });

    expect(result).toEqual({ data: 'success' });
    expect(oauth2Plugin.invalidateToken).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledTimes(2);
    expect(mockedFetch.mock.calls[0][1].headers.get('Authorization')).toBe('Bearer expired-token');
    expect(mockedFetch.mock.calls[1][1].headers.get('Authorization')).toBe('Bearer new-token');
  });

  it('should regenerate JWT and retry the call after token expiration for paginated endpoint', async () => {

    // Fake fetch simulation (first call 401, second call 200)
    mockedFetch.mockResolvedValueOnce(
      new Response('', {
        status: 401,
        headers: { 'www-authenticate': 'token expired' },
      }),
    );
    // Second call — success
    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({ data: ['success'], count: 1, page: 1, page_size: 2 }), {
        status: 200,
        headers: {},
      }),
    );

    const headers = new Headers({ Authorization: `Bearer ${token}` });
    const requestOptions = {
      method: 'GET',
      headers,
      hostname: 'https://api.example.com',
      path: '/endpoint',
    };

    const result = await apiClient.processCallWithPagination<{ data: string }>({
      url: 'https://api.example.com/endpoint',
      requestOptions,
      apiName: 'TestAPI',
      operationId: 'testOperation',
      pagination: PaginationEnum.PAGE,
      dataKey: 'data',
    });

    const expectedResponse = {
      data: ['success'],
      hasNextPage: false,
      nextPageValue: '"2"',
    };

    expect(result).toMatchObject(expectedResponse);
    expect(typeof result.nextPage).toBe('function');
    expect(oauth2Plugin.invalidateToken).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledTimes(2);
    expect(mockedFetch.mock.calls[0][1].headers.get('Authorization')).toBe('Bearer expired-token');
    expect(mockedFetch.mock.calls[1][1].headers.get('Authorization')).toBe('Bearer new-token');
  });

  it('should regenerate JWT and retry the call after token expiration for file call', async () => {

    // Fake fetch simulation (first call 401, second call 200)
    mockedFetch.mockResolvedValueOnce(
      new Response('', {
        status: 401,
        headers: { 'www-authenticate': 'token expired' },
      }),
    );
    // Second call — success
    mockedFetch.mockResolvedValue(
      new Response('responseBuffer', {
        status: 200,
        headers: {},
      }),
    );

    const headers = new Headers({ Authorization: `Bearer ${token}` });
    const requestOptions = {
      method: 'GET',
      headers,
      hostname: 'https://api.example.com',
      path: '/endpoint',
    };

    const result = await apiClient.processFileCall({
      url: 'https://api.example.com/endpoint',
      requestOptions,
      apiName: 'TestAPI',
      operationId: 'testOperation',
    });

    const expectedResponse = {
      buffer: Buffer.from('responseBuffer', 'utf-8'),
      fileName: 'default-name.pdf',
    };

    expect(result).toMatchObject(expectedResponse);
    expect(oauth2Plugin.invalidateToken).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledTimes(2);
    expect(mockedFetch.mock.calls[0][1].headers.get('Authorization')).toBe('Bearer expired-token');
    expect(mockedFetch.mock.calls[1][1].headers.get('Authorization')).toBe('Bearer new-token');
  });

});

describe('concurrent token refresh', () => {

  const CONCURRENT_REQUESTS = 5;
  const AUTH_URL = 'https://auth.test.sinch.com';
  const API_URL = 'https://api.test.sinch.com/sms/v1/batches';

  it('all concurrent requests should succeed when the token is expired', async () => {
    jest.clearAllMocks();

    let authCallCount = 0;       // tracks how many token requests hit the auth server
    const issuedTokens: string[] = []; // every token the auth server handed out
    let apiCallSequence = 0;

    mockedFetch.mockImplementation(async (url: string) => {

      if (url === `${AUTH_URL}/oauth2/token`) {
        authCallCount++;
        // Small delay so that all concurrent callers have time to reach this point
        await new Promise(resolve => setTimeout(resolve, 50));
        const newToken = `valid-jwt-${authCallCount}`;
        issuedTokens.push(newToken);
        return new Response(JSON.stringify({
          access_token: newToken,
          expires_in: 3600,
          scope: '',
          token_type: 'bearer',
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      apiCallSequence++;

      // First N calls: the token is expired on the server → 401
      if (apiCallSequence <= CONCURRENT_REQUESTS) {
        return new Response(JSON.stringify({ error: 'token expired' }), {
          status: 401,
          headers: {
            'www-authenticate':
              'Bearer realm="sinch", error="invalid_token", error_description="expired"',
          },
        });
      }

      // Retries: succeed (the auth server never fails, so every retry carries a valid token)
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    });

    const oauth2Plugin = new Oauth2TokenRequest('my-key-id', 'my-key-secret', AUTH_URL);

    const apiClient = new ApiFetchClient({
      requestPlugins: [oauth2Plugin],
    });

    const makeRequest = (id: number) => apiClient.processCall<any>({
      url: API_URL,
      requestOptions: {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        hostname: 'https://api.test.sinch.com',
        body: JSON.stringify({ to: ['+1234567890'], body: `Message ${id}` }),
      },
      apiName: 'SmsApi',
      operationId: 'SendBatch',
    });

    const results = await Promise.allSettled(
      Array.from({ length: CONCURRENT_REQUESTS }, (_, i) => makeRequest(i + 1)),
    );

    const fulfilled = results.filter(r => r.status === 'fulfilled');
    const rejected = results.filter(r => r.status === 'rejected');

    expect(rejected).toEqual([]);
    expect(fulfilled.length).toBe(CONCURRENT_REQUESTS);

    // The token refresh must be deduplicated: exactly 1 call to the auth server, not N.
    expect(authCallCount).toBe(1);

    // All retries must carry the exact same token (the one from the single auth call)
    expect(issuedTokens).toEqual(['valid-jwt-1']);
  });
});

describe('processFileResponse', () => {

  it('should return file buffer and file name when response is ok', async () => {
    // Given
    const apiClient = new ApiFetchClient({ requestPlugins: [] });
    const bufferData = Buffer.from('file-content', 'utf-8');
    const mockResponse = new Response('', { status: 200 });
    mockResponse.buffer = jest.fn().mockResolvedValue(bufferData);
    mockResponse.headers.set('content-disposition', 'attachment; filename="test.pdf"');

    const context = {
      response: mockResponse,
      body: undefined,
      apiCallParameters: {} as any,
      errorContext: {} as any,
    };

    // When
    const result = await apiClient['processFileResponse'](context);

    // Then
    expect(result).toEqual({
      fileName: 'test.pdf',
      buffer: bufferData,
    });
  });

  it('should throw an error if response is not ok', async () => {
    // Given
    const apiClient = new ApiFetchClient({ requestPlugins: [] });
    const mockResponse = new Response('', { status: 404 });
    const context = {
      response: mockResponse,
      body: undefined,
      apiCallParameters: {} as any,
      errorContext: {} as any,
    };

    // When & Then
    await expect(apiClient['processFileResponse'](context))
      .rejects
      .toThrow('No response received');
  });
});
