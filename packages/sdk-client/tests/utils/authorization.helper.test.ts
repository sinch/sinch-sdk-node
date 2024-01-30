import {
  calculateMD5,
  calculateSignature,
  calculateWebhookSignature,
  computeSignedData,
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

describe('Webhook signature (Conversation API)', () => {

  it('should compute the signed data', () => {
    const body = 'body';
    const nonce = 'nonce';
    const timestamp = 'timestamp';
    const signedData = computeSignedData(body, nonce, timestamp);
    expect(signedData).toEqual('body.nonce.timestamp');
  });

  it('should calculate the right signature', () => {
    // eslint-disable-next-line max-len
    const body = '{"app_id":"","accepted_time":"2021-10-18T17:49:13.813615Z","project_id":"e2df3a34-a71b-4448-9db5-a8d2baad28e4","contact_create_notification":{"contact":{"id":"01FJA8B466Y0R2GNXD78MD9SM1","channel_identities":[{"channel":"SMS","identity":"48123456789","app_id":""}],"display_name":"New Test Contact","email":"new.contact@email.com","external_id":"","metadata":"","language":"EN_US"}},"message_metadata":""}';
    const nonce = '01FJA8B4A7BM43YGWSG9GBV067';
    const timestamp= '1634579353';
    const signedData = computeSignedData(body, nonce, timestamp);
    const secret = 'foo_secret1234';
    const signature = calculateWebhookSignature(signedData, secret);

    expect(signature).toEqual('6bpJoRmFoXVjfJIVglMoJzYXxnoxRujzR4k2GOXewOE=');
  });

});
