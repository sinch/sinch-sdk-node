jest.mock('node-fetch', () => {
  const actual = jest.requireActual('node-fetch');
  return {
    __esModule: true,
    default: jest.fn(),
    Headers: actual.Headers,
    Response: actual.Response,
  };
});

import fetch, { Response } from 'node-fetch';
import FormData = require('form-data');
import { HttpHeaders, HttpMethod, HttpRequest } from '../../../src/http';
import { FetchHttpTransport } from '../../../src/http/fetch';

const mockedFetch = fetch as unknown as jest.Mock;

describe('FetchHttpTransport', () => {

  const transport = new FetchHttpTransport();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedFetch.mockResolvedValue(new Response('{}', { status: 200 }));
  });

  it('sends method, concatenated URL, headers, body and timeout', async () => {
    const request = new HttpRequest({
      method: HttpMethod.POST,
      url: 'https://example.com/upload',
      queryParameters: '?dryRun=true',
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      content: '{"hello":"world"}',
    });

    const response = await transport.send(request, { timeout: 5000 });

    expect(response.status).toBe(200);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch.mock.calls[0][0]).toBe('https://example.com/upload?dryRun=true');
    const init = mockedFetch.mock.calls[0][1];
    expect(init.method).toBe('POST');
    expect(init.body).toBe('{"hello":"world"}');
    expect(init.timeout).toBe(5000);
    expect(init.headers.get('Accept')).toBe('application/json');
    expect(init.headers.get('Content-Type')).toBe('application/json');
  });

  it('omits query string and body when they are null', async () => {
    const request = new HttpRequest({
      method: HttpMethod.DELETE,
      url: 'https://example.com/resource',
    });

    await transport.send(request);

    expect(mockedFetch.mock.calls[0][0]).toBe('https://example.com/resource');
    expect(mockedFetch.mock.calls[0][1].body).toBeUndefined();
  });

  it('forwards FormData content as the fetch body', async () => {
    const formData = new FormData();
    formData.append('to', 'someone@adomain.com');
    const request = new HttpRequest({
      method: HttpMethod.POST,
      url: 'https://example.com',
      content: formData,
    });

    await transport.send(request);

    expect(mockedFetch.mock.calls[0][1].body).toBe(formData);
  });

  it('releases the unused native response body', async () => {
    const destroy = jest.fn();
    const native = new Response('', { status: 429 });
    Object.defineProperty(native, 'body', {
      value: { destroy },
      configurable: true,
    });
    mockedFetch.mockResolvedValueOnce(native);

    const httpResponse = await transport.send(new HttpRequest({
      method: HttpMethod.GET,
      url: 'https://example.com',
    }));
    transport.release(httpResponse);

    expect(destroy).toHaveBeenCalledTimes(1);
  });

});
