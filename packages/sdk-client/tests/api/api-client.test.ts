import { ApiClient, ApiClientOptions } from '../../src';

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

});
