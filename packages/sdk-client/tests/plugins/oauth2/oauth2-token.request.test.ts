jest.mock('node-fetch', () => {
  const actual = jest.requireActual('node-fetch');
  return {
    __esModule: true,
    default: jest.fn(),
    Headers: actual.Headers,
    Response: actual.Response,
  };
});

import fetch, { Headers, Response } from 'node-fetch';
import { Oauth2TokenRequest } from '../../../src/plugins/oauth2/oauth2-token.request';

const mockedFetch = fetch as unknown as jest.Mock;

describe('Oauth2TokenRequest - concurrent token refresh', () => {

  let plugin: Oauth2TokenRequest;
  let authCallCount: number;

  beforeEach(() => {
    jest.clearAllMocks();
    authCallCount = 0;

    plugin = new Oauth2TokenRequest('test-key-id', 'test-key-secret', 'https://auth.test.com');

    mockedFetch.mockImplementation(async (url: string) => {
      if (url.includes('/oauth2/token')) {
        authCallCount++;
        // Simulate network delay to allow concurrency
        await new Promise(resolve => setTimeout(resolve, 50));
        return new Response(JSON.stringify({
          access_token: 'jwt-token-' + authCallCount,
          expires_in: 3600,
          scope: '',
          token_type: 'bearer',
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response('Not Found', { status: 404 });
    });
  });

  it('should make only one auth server call when multiple concurrent callers need a token', async () => {
    // Simulate N concurrent calls to load().transform()
    const baseOptions = {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      hostname: 'https://api.example.com',
      body: '{}',
    };

    const concurrentCalls = 10;
    const promises = Array.from({ length: concurrentCalls }, () =>
      plugin.load().transform({ ...baseOptions, headers: new Headers(baseOptions.headers) }),
    );

    const results = await Promise.all(promises);

    // Only ONE auth server call should be made
    expect(authCallCount).toBe(1);

    // All callers should get the same valid token
    for (const result of results) {
      expect(result.headers.get('Authorization')).toBe('Bearer jwt-token-1');
    }
  });

  it('should return cached token without auth call when token is already valid', async () => {
    // First call: fetches token
    const opts1 = { method: 'GET', headers: new Headers(), hostname: 'https://api.example.com' };
    const result1 = await plugin.load().transform(opts1);
    expect(authCallCount).toBe(1);
    expect(result1.headers.get('Authorization')).toBe('Bearer jwt-token-1');

    // Second call: should use cached token, no auth call
    const opts2 = {
      method: 'GET',
      headers: new Headers(),
      hostname: 'https://api.example.com',
    };
    const result2 = await plugin.load().transform(opts2);
    expect(authCallCount).toBe(1); // Still 1 — no new auth call
    expect(result2.headers.get('Authorization')).toBe('Bearer jwt-token-1');
  });

  it('should fetch a new token after invalidation', async () => {
    // First call: fetches token
    const opts1 = { method: 'GET', headers: new Headers(), hostname: 'https://api.example.com' };
    await plugin.load().transform(opts1);
    expect(authCallCount).toBe(1);

    // Invalidate the token (simulates expired token detected)
    plugin.invalidateToken();

    // Second call: should fetch a new token
    const opts2 = {
      method: 'GET',
      headers: new Headers(),
      hostname: 'https://api.example.com',
    };
    const result2 = await plugin.load().transform(opts2);
    expect(authCallCount).toBe(2);
    expect(result2.headers.get('Authorization')).toBe('Bearer jwt-token-2');
  });

  it('should deduplicate concurrent refreshes after invalidation', async () => {
    // Get initial token
    const baseOpts = { method: 'GET', headers: new Headers(), hostname: 'https://api.example.com' };
    await plugin.load().transform({ ...baseOpts, headers: new Headers() });
    expect(authCallCount).toBe(1);

    // Invalidate the token (simulates expired token detected)
    plugin.invalidateToken();

    // Fire 5 concurrent requests that all need to refresh
    const promises = Array.from({ length: 5 }, () =>
      plugin.load().transform({ ...baseOpts, headers: new Headers() }),
    );
    const results = await Promise.all(promises);

    // Only ONE additional auth call (total 2)
    expect(authCallCount).toBe(2);

    // All get the same refreshed token
    for (const result of results) {
      expect(result.headers.get('Authorization')).toBe('Bearer jwt-token-2');
    }
  });

  it('should recover after a failed token refresh and allow retry', async () => {
    let callNum = 0;
    mockedFetch.mockImplementation(async (url: string) => {
      if (url.includes('/oauth2/token')) {
        callNum++;
        authCallCount++;
        await new Promise(resolve => setTimeout(resolve, 50));
        // Make auth server fail on the first attempt
        if (callNum === 1) {
          throw new Error('Network error');
        }
        return new Response(JSON.stringify({
          access_token: 'recovered-token',
          expires_in: 3600,
          scope: '',
          token_type: 'bearer',
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response('Not Found', { status: 404 });
    });

    const opts = { method: 'GET', headers: new Headers(), hostname: 'https://api.example.com' };

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // First attempt: auth server fails → empty headers returned
    const result1 = await plugin.load().transform({ ...opts, headers: new Headers() });
    expect(authCallCount).toBe(1);
    // No Authorization header set (failed refresh returns {})
    expect(result1.headers.has('Authorization')).toBeFalsy();
    // Ensure the plugin logged the failure and the message contains the underlying error
    expect(errorSpy).toHaveBeenCalled();
    expect(errorSpy.mock.calls[0][0]).toContain('Network error');

    // Second attempt: pendingTokenRefresh should be cleared (finally block)
    // so a new refresh attempt is made and succeeds this time
    const result2 = await plugin.load().transform({ ...opts, headers: new Headers() });
    expect(authCallCount).toBe(2);
    expect(result2.headers.get('Authorization')).toBe('Bearer recovered-token');

    errorSpy.mockRestore();
  });

  it('should propagate failure to all concurrent callers when auth server fails', async () => {
    mockedFetch.mockImplementation(async (url: string) => {
      if (url.includes('/oauth2/token')) {
        authCallCount++;
        await new Promise(resolve => setTimeout(resolve, 50));
        // Auth server always fails
        throw new Error('Auth server down');
      }
      return new Response('Not Found', { status: 404 });
    });

    const baseOpts = { method: 'GET', headers: new Headers(), hostname: 'https://api.example.com' };

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Fire 5 concurrent requests
    const promises = Array.from({ length: 5 }, () =>
      plugin.load().transform({ ...baseOpts, headers: new Headers() }),
    );
    const results = await Promise.all(promises);

    // Only ONE auth call (deduplicated even for failures)
    expect(authCallCount).toBe(1);
    // Ensure the plugin logged the failure and the message contains the underlying error
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy.mock.calls[0][0]).toContain('Auth server down');

    // All callers get empty headers (error result propagated to all)
    for (const result of results) {
      expect(result.headers.has('Authorization')).toBeFalsy();
    }
  });
});
