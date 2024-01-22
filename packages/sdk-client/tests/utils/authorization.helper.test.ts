import {
  calculateMD5,
  calculateSignature,
  generateAuthorizationHeader,
  validateAuthenticationHeader,
} from '../../src';

describe('Authorization validation', () => {

  const APPLICATION_KEY = 'app-key';
  const APPLICATION_SECRET = 'app-secret';
  const PATH = '/webhook';
  const BODY = `{"id":"018d2104-aaa-bbbb-1234","price":{"amount":0.0308},"rate":{"amount":0.0}}`;
  const METHOD = 'POST';
  const CONTENT_TYPE = 'application/json; charset=utf-8';
  const X_TIMESTAMP = 'x-timestamp:2024-01-19T09:19:28.9372196Z';

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
    expect(calculateSignature(secret, stringToSign)).toBe('1vZeB9AYiJthOvaZeZFhOxZWLSqHHFWzFw7AGjrTtmk=');
  });

  it('should generate the authorization header', () => {
    const header = generateAuthorizationHeader(
      METHOD,
      BODY,
      CONTENT_TYPE,
      X_TIMESTAMP,
      PATH,
      APPLICATION_KEY,
      APPLICATION_SECRET,
    );
    expect(header).toEqual('Application app-key:p7hUz20oz16Fhfogs4Z0X+VA/Nhuu505I1alXYqwlKw=');
  });

  it('should validate the authorization header for "application" authorization', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': 'Application app-key:wC8XcoLQ22cxrOsUqqbWk+LHJ82wtqR/IgeIp9NG8LY=',
    };

    const validated = validateAuthenticationHeader(
      APPLICATION_KEY,
      APPLICATION_SECRET,
      headers,
      PATH,
      BODY,
      METHOD,
    );

    expect(validated).toBeTruthy();
  });

  it('should validate the authorization header for "basic" authorization', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': `Basic ${APPLICATION_KEY}:${APPLICATION_SECRET}`,
    };

    const validated = validateAuthenticationHeader(
      APPLICATION_KEY,
      APPLICATION_SECRET,
      headers,
      PATH,
      BODY,
      METHOD,
    );

    expect(validated).toBeTruthy();
  });

  it('should throw an exception when trying to validate an authorization header with an unsupported scheme', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': 'Unknown app-key:p7hUz20oz16Fhfogs4Z0X+VA/Nhuu505I1alXYqwlKw=',
    };
    const validated = validateAuthenticationHeader(
      APPLICATION_KEY,
      APPLICATION_SECRET,
      headers,
      PATH,
      BODY,
      METHOD,
    );

    expect(validated).toBeFalsy();
  });

  it('should throw an exception when trying to validate a malformatted authorization header', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': `Application  ${APPLICATION_KEY}:${APPLICATION_SECRET}`,
    };
    const validated = validateAuthenticationHeader(
      APPLICATION_KEY,
      APPLICATION_SECRET,
      headers,
      PATH,
      BODY,
      METHOD,
    );

    expect(validated).toBeFalsy();
  });

  it('should throw an exception when trying to validate a malformed value in the authorization header', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': `Application ${APPLICATION_KEY}${APPLICATION_SECRET}`,
    };
    const validated = validateAuthenticationHeader(
      APPLICATION_KEY,
      APPLICATION_SECRET,
      headers,
      PATH,
      BODY,
      METHOD,
    );

    expect(validated).toBeFalsy();
  });

  it('should throw an exception when trying to validate a malformed value in the basic authorization header', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': `Basic ${APPLICATION_KEY}${APPLICATION_SECRET}`,
    };
    const validated = validateAuthenticationHeader(
      APPLICATION_KEY,
      APPLICATION_SECRET,
      headers,
      PATH,
      BODY,
      METHOD,
    );

    expect(validated).toBeFalsy();
  });

  it('should throw an exception when trying to validate an basic authorization with a wrong value', () => {
    const headers = {
      'Content-Type': CONTENT_TYPE,
      'x-timestamp': X_TIMESTAMP,
      'authorization': `Basic ${APPLICATION_KEY}:wrong-app-secret`,
    };
    const validated = validateAuthenticationHeader(
      APPLICATION_KEY,
      APPLICATION_SECRET,
      headers,
      PATH,
      BODY,
      METHOD,
    );

    expect(validated).toBeFalsy();
  });

});
