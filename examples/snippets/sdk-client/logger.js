/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 *
 * The SDK accepts any object implementing the Logger interface (debug, info, warn, error).
 * Pass it via the `logger` option on SinchClient.
 *
 * Example with Winston (install separately: npm install winston):
 *
 *   import winston from 'winston';
 *
 *   const winstonLogger = winston.createLogger({
 *     level: 'debug',
 *     transports: [new winston.transports.Console()],
 *     format: winston.format.logstash(),
 *   });
 *
 *   new SinchClient({ projectId, keyId, keySecret, logger: winstonLogger });
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'MY_KEY_SECRET';

  // Omit `logger` to use console, pass `logger: null` to silence SDK output,
  // or pass a custom logger — see the Winston example in the header comment.
  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    await sinch.numbers.availableRegions.list();
    console.log('✅ SDK request completed.');
  } catch (err) {
    console.error('❌ Failed to call the Numbers API:');
    console.error(err);
  }
}

main();
