import { Headers } from 'node-fetch';
import { ApiCallParameters } from '../../src/api/api-client';
import { HttpMethod, splitUrlAndQuery, toHttpRequest } from '../../src/http';

describe('toHttpRequest', () => {

  const baseParams = (): ApiCallParameters => ({
    url: 'https://numbers.api.sinch.com/v1/projects/P1/activeNumbers?pageSize=5&regionCode=US',
    requestOptions: {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: 'Bearer token',
      }),
      hostname: 'https://numbers.api.sinch.com',
    },
    apiName: 'Numbers',
    operationId: 'ListActiveNumbers',
  });

  it('splits the prepared URL into url and queryParameters', () => {
    expect(splitUrlAndQuery(
      'https://numbers.api.sinch.com/v1/projects/P1/activeNumbers?pageSize=5',
    )).toEqual({
      url: 'https://numbers.api.sinch.com/v1/projects/P1/activeNumbers',
      queryParameters: '?pageSize=5',
    });
    expect(splitUrlAndQuery('https://example.com/path')).toEqual({
      url: 'https://example.com/path',
      queryParameters: null,
    });
  });

  it('maps ApiCallParameters onto HttpRequest', () => {
    const request = toHttpRequest(baseParams());

    expect(request.method).toBe(HttpMethod.GET);
    expect(request.url).toBe('https://numbers.api.sinch.com/v1/projects/P1/activeNumbers');
    expect(request.queryParameters).toBe('?pageSize=5&regionCode=US');
    expect(request.headers.get('accept')).toBe('application/json');
    expect(request.headers.get('authorization')).toBe('Bearer token');
    expect(request.content).toBeNull();
  });

  it('uses rebuilt request options for content and headers', () => {
    const params = baseParams();
    params.url = 'https://calling.api.sinch.com/calling/v1/callouts';
    const request = toHttpRequest(params, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      hostname: 'https://calling.api.sinch.com',
      body: '{"method":"ttsCallout"}',
    });

    expect(request.method).toBe(HttpMethod.POST);
    expect(request.url).toBe('https://calling.api.sinch.com/calling/v1/callouts');
    expect(request.queryParameters).toBeNull();
    expect(request.content).toBe('{"method":"ttsCallout"}');
    expect(request.headers.get('content-type')).toBe('application/json');
  });

  it('rejects unsupported HTTP methods', () => {
    const params = baseParams();
    expect(() => toHttpRequest(params, {
      ...params.requestOptions,
      method: 'OPTIONS',
    })).toThrow('Unsupported HTTP method: OPTIONS');
  });

});
