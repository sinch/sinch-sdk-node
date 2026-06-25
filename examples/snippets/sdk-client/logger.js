/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 *
 * The SDK accepts any object implementing the Logger interface (debug, info, warn, error).
 * Pass it via the `logger` option — it is wrapped in SinchLogger automatically.
 *
 * This example uses Winston (https://www.npmjs.com/package/winston). An invalid OAuth
 * endpoint is used on purpose so the token request fails with an HTTP error and the SDK
 * logs the response details at debug level.
 */
import { Oauth2TokenRequest } from '@sinch/sdk-core';
import { Headers } from 'node-fetch';
import * as winston from 'winston';

const winstonLogger = winston.createLogger({
  level: 'debug',
  transports: [new winston.transports.Console()],
  format: winston.format.printf(({ level, message }) => {
    const text = typeof message === 'function' ? message() : message;
    return JSON.stringify({ '@fields': { level }, '@message': text });
  }),
});

async function main() {
  const keyId = 'MY_KEY_ID';
  const keySecret = 'MY_KEY_SECRET';
  const invalidAuthHostname = 'https://example.com';

  const oauthPlugin = new Oauth2TokenRequest(keyId, keySecret, invalidAuthHostname, winstonLogger);

  try {
    await oauthPlugin.load().transform({
      method: 'GET',
      headers: new Headers(),
      hostname: '',
    });
    console.log('✅ OAuth token obtained.');
  } catch {
    console.log('✅ Expected OAuth failure. Check Winston debug output above.');
  }
}

main();
