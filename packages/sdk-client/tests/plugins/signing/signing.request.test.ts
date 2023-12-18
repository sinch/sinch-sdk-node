import { calculateHMACSHA256, calculateMD5, RequestOptions, SigningRequest } from '../../../src';
import { Headers } from 'node-fetch';

describe('Signed request plugin', () => {

  it('should calculate the content-MD5 for the stringified JSON', () => {
    const body = {
      identity: {
        type: 'number',
        endpoint: '+33444555666',
      },
      method: 'sms',
    };
    expect(calculateMD5(JSON.stringify(body))).toBe('RkD29EocJh6t7zr5QfKM4g==');
  });

  it('should calculate the signature', () => {
    const secret = btoa("my-secret");
    const stringToSign = 'pKXhl9sOsUjClws1oANArA==';
    expect(calculateHMACSHA256(secret, stringToSign)).toBe('1vZeB9AYiJthOvaZeZFhOxZWLSqHHFWzFw7AGjrTtmk=');
  });

  it('should create the authentication header for a request with a body', async () => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json; charset=UTF-8');
    headers.set('x-timestamp', '2023-11-22T09:10:11.999Z');
    const requestData = {
      identity: {
        type: 'number',
        endpoint: '+33444555666',
      },
      method: 'sms',
    };
    const options: RequestOptions = {
      method: 'post',
      headers: headers,
      body: JSON.stringify(requestData),
      basePath: 'https://test.com/path/pathParamValue',
      path: '/path/pathParamValue',
    };
    const plugin = new SigningRequest('my-key-id', btoa('my-key-secret'));
    const runner = plugin.load();
    const result = await runner.transform(options);

    expect(result.headers.get('Content-Type')).toBe('application/json; charset=UTF-8');
    expect(result.headers.get('Authorization'))
      .toBe('Application my-key-id:QP3OzQZVzRZAEev6DBLvJkgpiqyZPuXYsc7oyjUV0K8=');
  });

  it('should create the authentication header for a request with no body', async () => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('x-timestamp', '2023-11-22T09:10:11.999Z');
    const options: RequestOptions = {
      method: 'get',
      headers: headers,
      body: '',
      basePath: 'https://test.com/path/pathParamValue',
      path: '/path/pathParamValue',
    };
    const plugin = new SigningRequest('my-key-id', btoa('my-key-secret'));
    const runner = plugin.load();
    const result = await runner.transform(options);

    expect(result.headers.get('Content-Type')).toBe('application/json');
    expect(result.headers.get('Authorization'))
      .toBe('Application my-key-id:nsrLDvP6KVD/dAxb3IfAncdwjPFJVWSrseEFOcZge+A=');
  });

});
