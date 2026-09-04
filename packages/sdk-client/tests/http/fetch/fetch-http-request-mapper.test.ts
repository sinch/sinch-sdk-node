import { Headers } from 'node-fetch';
import { ApiCallParameters } from '../../../src/api/api-client';
import { HttpMethod } from '../../../src/http';
import { toHttpRequest } from '../../../src/http/fetch';

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

  it('maps ApiCallParameters onto HttpRequest and splits the prepared URL', () => {
    const request = toHttpRequest(baseParams());

    expect(request.method).toBe(HttpMethod.GET);
    expect(request.url).toBe('https://numbers.api.sinch.com/v1/projects/P1/activeNumbers');
    expect(request.queryParameters).toBe('?pageSize=5&regionCode=US');
    expect(request.headers.get('accept')).toBe('application/json');
    expect(request.headers.get('authorization')).toBe('Bearer token');
    expect(request.content).toBeNull();
  });

  it('maps a path-only URL with a null query string', () => {
    const params = baseParams();
    params.url = 'https://example.com/path';
    const request = toHttpRequest(params);

    expect(request.url).toBe('https://example.com/path');
    expect(request.queryParameters).toBeNull();
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

  it('rejects a missing HTTP method', () => {
    const params = baseParams();
    expect(() => toHttpRequest(params, {
      ...params.requestOptions,
      method: undefined,
    })).toThrow('HTTP method is required');
  });

});
