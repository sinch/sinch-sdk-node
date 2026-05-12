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

    // Clear the cached token (simulates expired token detected)
    plugin.clearCachedToken();

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

    // Clear the cached token (simulates expired token detected)
    plugin.clearCachedToken();

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

    // First attempt: auth server fails → error propagates to caller
    await expect(
      plugin.load().transform({ ...opts, headers: new Headers() }),
    ).rejects.toThrow('Network error');
    expect(authCallCount).toBe(1);

    // Second attempt: pendingTokenRefresh was cleared in the finally block,
    // so a new refresh attempt is made and succeeds this time
    const result2 = await plugin.load().transform({ ...opts, headers: new Headers() });
    expect(authCallCount).toBe(2);
    expect(result2.headers.get('Authorization')).toBe('Bearer recovered-token');
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

    // Fire 5 concurrent requests; all should reject with the auth error
    const promises = Array.from({ length: 5 }, () =>
      plugin.load().transform({ ...baseOpts, headers: new Headers() }),
    );
    const settled = await Promise.allSettled(promises);

    // Only ONE auth call (deduplicated even for failures)
    expect(authCallCount).toBe(1);
    for (const result of settled) {
      expect(result.status).toBe('rejected');
      expect((result as PromiseRejectedResult).reason.message).toContain('Auth server down');
    }
  });

  it('should refresh proactively when the cached JWT is within the safety margin of expiry', async () => {
    // Build a JWT whose `exp` is 10 seconds from now — well inside the 30s safety margin
    const buildJwt = (expSecondsFromNow: number) => {
      const b64url = (s: string) =>
        Buffer.from(s).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
      const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = b64url(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + expSecondsFromNow }));
      return `${header}.${payload}.sig`;
    };

    let issuance = 0;
    mockedFetch.mockImplementation(async (url: string) => {
      if (url.includes('/oauth2/token')) {
        issuance++;
        authCallCount++;
        // First token expires in 10s (inside safety margin → next call refreshes)
        // Second token expires in 3600s
        const expIn = issuance === 1 ? 10 : 3600;
        return new Response(JSON.stringify({
          access_token: buildJwt(expIn),
          expires_in: expIn,
          scope: '',
          token_type: 'bearer',
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Not Found', { status: 404 });
    });

    const opts = { method: 'GET', headers: new Headers(), hostname: 'https://api.example.com' };

    // First call: fetches near-expiry token
    await plugin.load().transform({ ...opts, headers: new Headers() });
    expect(authCallCount).toBe(1);

    // Second call: cached JWT is within the safety margin → proactive refresh
    const result2 = await plugin.load().transform({ ...opts, headers: new Headers() });
    expect(authCallCount).toBe(2);
    // Verify the refreshed token is in use
    expect(result2.headers.get('Authorization')!.startsWith('Bearer ')).toBeTruthy();
  });

  it('clearCachedToken with a stale JWT should not wipe a freshly refreshed token', async () => {
    const opts = { method: 'GET', headers: new Headers(), hostname: 'https://api.example.com' };

    // Cache JWT_A
    const r1 = await plugin.load().transform({ ...opts, headers: new Headers() });
    const tokenA = r1.headers.get('Authorization');
    expect(tokenA).toBe('Bearer jwt-token-1');

    // Force a refresh by passing the unconditional-clearCache form
    plugin.clearCachedToken();
    await plugin.load().transform({ ...opts, headers: new Headers() });
    expect(authCallCount).toBe(2);

    // Now simulate a stale-JWT 401 retry calling clearCachedToken with JWT_A.
    // The cached token is JWT_B: clearCachedToken must be a no-op.
    plugin.clearCachedToken('jwt-token-1');

    // Next call should reuse JWT_B (no extra auth fetch)
    const r2 = await plugin.load().transform({ ...opts, headers: new Headers() });
    expect(authCallCount).toBe(2);
    expect(r2.headers.get('Authorization')).toBe('Bearer jwt-token-2');
  });
});
