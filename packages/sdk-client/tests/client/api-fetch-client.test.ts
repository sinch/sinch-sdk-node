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
import { ApiFetchClient, PaginationEnum } from '../../src';
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
