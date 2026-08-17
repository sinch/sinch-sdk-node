import { ApiClient, ApiClientOptions, ApiFetchClient } from '../../src';

describe('API client', () => {

  const options: ApiClientOptions = {};
  const apiClient: ApiClient = new ApiClient(options);

  it('should format the URL without request parameters', () => {
    const url = 'https://example.com';
    const formattedUrl = apiClient.prepareUrl(url);
    expect(formattedUrl).toBe('https://example.com');
  });

  it('should format the URL with simple parameters', () => {
    const url = 'https://example.com';
    const parameters = apiClient.extractQueryParams({
      foo: 'fooValue',
      bar: '1',
      baz: undefined,
    }, ['foo', 'bar', 'baz'] );
    const formattedUrl = apiClient.prepareUrl(url, parameters);
    expect(formattedUrl).toBe('https://example.com?foo=fooValue&bar=1');
  });

  it('should format the URL with array parameters', () => {
    const url = 'https://example.com';
    const parameters = apiClient.extractQueryParams({
      foo: 'fooValue',
      bar: ['1' ,'2'],
      baz: undefined,
    }, ['foo', 'bar', 'baz'] );
    const formattedUrl = apiClient.prepareUrl(url, parameters);
    expect(formattedUrl).toBe('https://example.com?foo=fooValue&bar=1,2');
  });

  it('should format the URL with array parameters with repeat key', () => {
    const url = 'https://example.com';
    const parameters = apiClient.extractQueryParams({
      foo: 'fooValue',
      bar: ['1' ,'2'],
      baz: undefined,
    }, ['foo', 'bar', 'baz'] );
    const formattedUrl = apiClient.prepareUrl(url, parameters, true);
    expect(formattedUrl).toBe('https://example.com?foo=fooValue&bar=1&bar=2');
  });

  describe('prepareOptions timeout', () => {
    it('should default timeout to 60000 ms when timeoutSeconds is omitted', async () => {
      const client = new ApiFetchClient({ requestPlugins: [] });
      const opts = await client.prepareOptions('https://example.com', 'GET', {}, {});
      expect(opts.timeout).toBe(60_000);
    });

    it('should convert timeoutSeconds to milliseconds', async () => {
      const client = new ApiFetchClient({ requestPlugins: [], timeoutSeconds: 30 });
      const opts = await client.prepareOptions('https://example.com', 'GET', {}, {});
      expect(opts.timeout).toBe(30_000);
    });

    it('should allow disabling timeout with timeoutSeconds 0', async () => {
      const client = new ApiFetchClient({ requestPlugins: [], timeoutSeconds: 0 });
      const opts = await client.prepareOptions('https://example.com', 'GET', {}, {});
      expect(opts.timeout).toBe(0);
    });

    it('should not accept negative timeoutSeconds', () => {
      expect(() => new ApiFetchClient({ requestPlugins: [], timeoutSeconds: -1 }))
        .toThrow('Invalid configuration: "timeoutSeconds" must be a non-negative number');
    });
  });

});
