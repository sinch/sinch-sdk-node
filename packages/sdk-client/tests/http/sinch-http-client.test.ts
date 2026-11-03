jest.mock('node-fetch', () => {
  const actual = jest.requireActual('node-fetch');
  return {
    __esModule: true,
    default: jest.fn(),
    Headers: actual.Headers,
    Response: actual.Response,
  };
});

jest.mock('../../src/client/retry-policy', () => {
  const actual = jest.requireActual('../../src/client/retry-policy');
  return {
    ...actual,
    sleep: jest.fn().mockResolvedValue(undefined),
  };
});

import fetch, { Response } from 'node-fetch';
import FormData = require('form-data');
import { Readable } from 'stream';
import {
  ApiHttpError,
  HttpHeaders,
  HttpHelpers,
  SinchHttpClient,
  SupportedRetryPolicy,
} from '../../src';

const mockedFetch = fetch as unknown as jest.Mock;

const AUTH_URL = 'https://auth.sinch.com/oauth2/token';
const API_URL = 'https://numbers.api.sinch.com/v1/projects/P1/activeNumbers';

const credentials = { keyId: 'KEY_ID', keySecret: 'KEY_SECRET', logger: null };

type ApiHandler = (url: string, init: any) => Response;

const mockServer = (apiHandler: ApiHandler) => {
  let tokenCount = 0;
  mockedFetch.mockImplementation(async (url: string, init: any) => {
    if (url === AUTH_URL) {
      tokenCount++;
      return new Response(
        JSON.stringify({ access_token: `token-${tokenCount}`, expires_in: 3599, token_type: 'bearer' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }
    return apiHandler(url, init);
  });
};

const apiCalls = () => mockedFetch.mock.calls.filter(([url]) => url !== AUTH_URL);

const ok = (body = '{"ok":true}') =>
  new Response(body, { status: 200, headers: { 'Content-Type': 'application/json' } });

describe('SinchHttpClient', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('verbs', () => {

    beforeEach(() => mockServer(() => ok()));

    it('sends a GET with the raw query string and the caller headers', async () => {
      const client = new SinchHttpClient(credentials);

      const response = await client.get(API_URL, {
        queryParams: '?pageSize=5&regionCode=US',
        headers: { accept: 'application/json' },
      });

      expect(response.status).toBe(200);
      expect(await response.content.asJson()).toEqual({ ok: true });
      const [[url, init]] = apiCalls();
      expect(url).toBe(`${API_URL}?pageSize=5&regionCode=US`);
      expect(init.method).toBe('GET');
      expect(init.body).toBeUndefined();
      expect(init.headers.get('accept')).toBe('application/json');
    });

    it.each([
      ['a string without the leading "?"', 'pageSize=5&regionCode=US', '?pageSize=5&regionCode=US'],
      ['a URLSearchParams', new URLSearchParams([['pageSize', '5'], ['type', 'LOCAL'], ['type', 'MOBILE']]),
        '?pageSize=5&type=LOCAL&type=MOBILE'],
      ['an empty string', '', ''],
      ['a lone "?"', '?', ''],
      ['an empty URLSearchParams', new URLSearchParams(), ''],
    ])('builds the query string from %s', async (_label, queryParams, expected) => {
      const client = new SinchHttpClient(credentials);

      await client.get(API_URL, { queryParams });

      const [[url]] = apiCalls();
      expect(url).toBe(`${API_URL}${expected}`);
    });

    it('sends a DELETE without query string', async () => {
      const client = new SinchHttpClient(credentials);

      await client.delete(`${API_URL}/+12345`);

      const [[url, init]] = apiCalls();
      expect(url).toBe(`${API_URL}/+12345`);
      expect(init.method).toBe('DELETE');
    });

    it.each([
      ['post', 'POST'],
      ['put', 'PUT'],
      ['patch', 'PATCH'],
    ] as const)('sends a %s with the body untouched', async (verb, method) => {
      const client = new SinchHttpClient(credentials);
      const body = '{"method":"ttsCallout","ttsCallout":{"cli":"+14045001000"}}';

      await client[verb](API_URL, body, { headers: { 'content-type': 'application/json' } });

      const [[, init]] = apiCalls();
      expect(init.method).toBe(method);
      expect(init.body).toBe(body);
      expect(init.headers.get('content-type')).toBe('application/json');
    });

    it('sends bytes as a Buffer', async () => {
      const client = new SinchHttpClient(credentials);

      await client.post(API_URL, new Uint8Array([0xff, 0xd8, 0xff]), {
        headers: { 'content-type': 'image/jpeg' },
      });

      const [[, init]] = apiCalls();
      expect(Buffer.isBuffer(init.body)).toBe(true);
      expect([...init.body]).toEqual([0xff, 0xd8, 0xff]);
    });

    it('sends a file read with HttpHelpers.fromFile', async () => {
      const client = new SinchHttpClient(credentials);
      const content = await HttpHelpers.fromFile(__filename);

      await client.put(API_URL, content, { headers: { 'content-type': 'text/plain' } });

      const [[, init]] = apiCalls();
      expect(init.body.equals(content)).toBe(true);
    });

    it('sends a record as a multipart/form-data body with its boundary', async () => {
      const client = new SinchHttpClient(credentials);

      await client.postFormData(API_URL, {
        to: 'someone@adomain.com',
        text: 'Hello from Sinch',
      }, { headers: { 'content-type': 'should be overridden' } });

      const [[, init]] = apiCalls();
      const contentType: string = init.headers.get('content-type');
      expect(contentType).toMatch(/^multipart\/form-data; boundary=/);
      const boundary = contentType.split('boundary=')[1];
      const body = init.body.toString();
      expect(body).toContain(`--${boundary}`);
      expect(body).toContain('name="to"\r\n\r\nsomeone@adomain.com');
      expect(body).toContain('name="text"\r\n\r\nHello from Sinch');
    });

    it('accepts a FormData instance', async () => {
      const client = new SinchHttpClient(credentials);
      const form = new FormData();
      form.append('from', 'myself@sinch.com');

      await client.postFormData(API_URL, form);

      const [[, init]] = apiCalls();
      expect(init.headers.get('content-type')).toBe(form.getHeaders()['content-type']);
      expect(init.body.toString()).toContain('myself@sinch.com');
    });

    it('accepts HttpHeaders with repeated values', async () => {
      const client = new SinchHttpClient(credentials);
      const headers = new HttpHeaders().append('x-custom', 'a').append('X-Custom', 'b');

      await client.get(API_URL, { headers });

      const [[, init]] = apiCalls();
      expect(init.headers.raw()['x-custom']).toEqual(['a', 'b']);
    });

    it('skips the headers with an undefined value', async () => {
      const client = new SinchHttpClient(credentials);
      const headers = { 'x-request-id': undefined, 'x-custom': 'a' } as unknown as Record<string, string>;

      await client.get(API_URL, { headers });

      const [[, init]] = apiCalls();
      expect(init.headers.has('x-request-id')).toBe(false);
      expect(init.headers.get('x-custom')).toBe('a');
    });
  });

  describe('SDK headers', () => {

    beforeEach(() => mockServer(() => ok()));

    it('injects the OAuth2 bearer token', async () => {
      const client = new SinchHttpClient(credentials);

      await client.get(API_URL);
      await client.get(API_URL);

      const calls = apiCalls();
      expect(calls[0][1].headers.get('Authorization')).toBe('Bearer token-1');
      expect(calls[1][1].headers.get('Authorization')).toBe('Bearer token-1');
      expect(mockedFetch.mock.calls.filter(([url]) => url === AUTH_URL)).toHaveLength(1);
    });

    it('identifies the http implementation in the User-Agent, overriding the caller value', async () => {
      const client = new SinchHttpClient(credentials);

      await client.get(API_URL, { headers: { 'User-Agent': 'my-agent' } });

      const [[, init]] = apiCalls();
      // `get` joins repeated values with ", ": a single SDK value means the caller one was overridden
      expect(init.headers.get('User-Agent'))
        .toMatch(/^sinch-sdk\/\S+ \(JavaScript\/v\S+; http; none\)$/);
    });

    it('does not authenticate when useSinchAuth is false at request level', async () => {
      const client = new SinchHttpClient(credentials);

      await client.get(API_URL, {
        headers: { Authorization: 'Bearer my-own-token' },
        options: { useSinchAuth: false },
      });

      const [[, init]] = apiCalls();
      expect(init.headers.get('Authorization')).toBe('Bearer my-own-token');
      expect(mockedFetch.mock.calls.filter(([url]) => url === AUTH_URL)).toHaveLength(0);
    });

    it('does not require credentials when useSinchAuth is false at client level', async () => {
      const client = new SinchHttpClient({ useSinchAuth: false, logger: null });

      await client.get(API_URL);

      const [[, init]] = apiCalls();
      expect(init.headers.has('Authorization')).toBe(false);
    });

    it('authenticates at request level when the client has credentials but useSinchAuth is false', async () => {
      const client = new SinchHttpClient({ ...credentials, useSinchAuth: false });

      await client.get(API_URL);
      await client.get(API_URL, { options: { useSinchAuth: true } });

      const calls = apiCalls();
      expect(calls[0][1].headers.has('Authorization')).toBe(false);
      expect(calls[1][1].headers.get('Authorization')).toBe('Bearer token-1');
    });
  });

  describe('configuration errors', () => {

    it('raises the missing credentials error on the first call, not at construction', async () => {
      const client = new SinchHttpClient({ logger: null });

      await expect(client.get(API_URL)).rejects.toThrow('"keyId" and "keySecret" values must be provided');
    });

    it('rejects useSinchAuth at request level when the client has no credentials', async () => {
      mockServer(() => ok());
      const client = new SinchHttpClient({ useSinchAuth: false, logger: null });

      await expect(client.get(API_URL, { options: { useSinchAuth: true } }))
        .rejects.toThrow('"useSinchAuth" requires "keyId" and "keySecret"');
    });

    it('rejects an invalid request-level retry setting as a configuration error', async () => {
      mockServer(() => ok());
      const client = new SinchHttpClient(credentials);

      const error = await client.get(API_URL, { options: { maxRetryCount: -1 } }).catch((e) => e);

      expect(error.message).toBe('Invalid configuration: "maxRetryCount" must be a non-negative integer');
      expect(apiCalls()).toHaveLength(0);
    });

    it('rejects, rather than throws, when the form data cannot be serialized', async () => {
      const client = new SinchHttpClient(credentials);
      const form = new FormData();
      form.append('file', Readable.from(['content']));

      const result = client.postFormData(API_URL, form);

      await expect(result).rejects.toThrow('Unable to serialize the form data (streams are not supported)');
    });
  });

  describe('errors', () => {

    it('throws an ApiHttpError with the response for status >= 400', async () => {
      mockServer(() => new Response(
        JSON.stringify({ error: { code: 404, message: 'Not found' } }),
        { status: 404, statusText: 'Not Found', headers: { 'Content-Type': 'application/json' } },
      ));
      const client = new SinchHttpClient(credentials);

      const error: ApiHttpError = await client.get(API_URL).catch((e) => e);

      expect(error).toBeInstanceOf(ApiHttpError);
      expect(error.statusCode).toBe(404);
      expect(error.response.status).toBe(404);
      expect(error.responseHeaders?.['content-type']).toBe('application/json');
      expect(await error.response.content.asJson()).toEqual({ error: { code: 404, message: 'Not found' } });
      expect(JSON.parse(error.data!)).toEqual({ error: { code: 404, message: 'Not found' } });
    });

    it('keeps a non-JSON error body as text', async () => {
      mockServer(() => new Response('Bad gateway', { status: 502 }));
      const client = new SinchHttpClient(credentials);

      const error: ApiHttpError = await client.get(API_URL).catch((e) => e);

      expect(error.statusCode).toBe(502);
      expect(await error.response.content.asString()).toBe('Bad gateway');
      expect(JSON.parse(error.data!)).toBe('Bad gateway');
    });

    it('does not throw for redirection statuses', async () => {
      mockServer(() => new Response('', { status: 304 }));
      const client = new SinchHttpClient(credentials);

      const response = await client.get(API_URL);

      expect(response.status).toBe(304);
    });
  });

  describe('retries and token refresh', () => {
    let randomSpy: jest.SpyInstance;

    beforeEach(() => {
      randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
    });

    afterEach(() => randomSpy.mockRestore());

    const rateLimitedOnce = () => {
      let calls = 0;
      mockServer(() => ++calls === 1
        ? new Response('', { status: 429, headers: { 'Retry-After': '1' } })
        : ok());
    };

    it('retries a 429 honoring Retry-After', async () => {
      rateLimitedOnce();
      const client = new SinchHttpClient(credentials);

      const response = await client.get(API_URL);

      expect(response.status).toBe(200);
      expect(apiCalls()).toHaveLength(2);
    });

    it('does not retry when retryPolicy is NONE at request level', async () => {
      rateLimitedOnce();
      const client = new SinchHttpClient(credentials);

      const error = await client.get(API_URL, { options: { retryPolicy: SupportedRetryPolicy.NONE } })
        .catch((e) => e);

      expect(error).toBeInstanceOf(ApiHttpError);
      expect(error.statusCode).toBe(429);
      expect(apiCalls()).toHaveLength(1);
    });

    it('honors maxRetryCount at request level over the client one', async () => {
      mockServer(() => new Response('', { status: 429 }));
      const client = new SinchHttpClient({ ...credentials, maxRetryCount: 3 });

      await expect(client.get(API_URL, { options: { maxRetryCount: 1 } })).rejects.toThrow(ApiHttpError);

      expect(apiCalls()).toHaveLength(2);
    });

    it('refreshes an expired token and replays a form-data body', async () => {
      let calls = 0;
      mockServer(() => ++calls === 1
        ? new Response('', { status: 401, headers: { 'www-authenticate': 'Bearer error="token expired"' } })
        : ok());
      const client = new SinchHttpClient(credentials);

      await client.postFormData(API_URL, { text: 'Hello' });

      const calls2 = apiCalls();
      expect(calls2).toHaveLength(2);
      expect(calls2[0][1].headers.get('Authorization')).toBe('Bearer token-1');
      expect(calls2[1][1].headers.get('Authorization')).toBe('Bearer token-2');
      expect(calls2[1][1].body.equals(calls2[0][1].body)).toBe(true);
    });

    it('does not refresh the token when the caller manages the authentication', async () => {
      mockServer(() => new Response('', {
        status: 401,
        headers: { 'www-authenticate': 'Bearer error="token expired"' },
      }));
      const client = new SinchHttpClient(credentials);

      const error = await client.get(API_URL, { options: { useSinchAuth: false } }).catch((e) => e);

      expect(error).toBeInstanceOf(ApiHttpError);
      expect(error.statusCode).toBe(401);
      expect(apiCalls()).toHaveLength(1);
    });
  });

  describe('timeout', () => {

    beforeEach(() => mockServer(() => ok()));

    it('uses the client timeout by default', async () => {
      const client = new SinchHttpClient({ ...credentials, timeoutSeconds: 30 });

      await client.get(API_URL);

      expect(apiCalls()[0][1].timeout).toBe(30_000);
    });

    it('uses the request-level timeout when provided', async () => {
      const client = new SinchHttpClient({ ...credentials, timeoutSeconds: 30 });

      await client.get(API_URL, { options: { timeoutSeconds: 5 } });

      expect(apiCalls()[0][1].timeout).toBe(5_000);
    });
  });
});
