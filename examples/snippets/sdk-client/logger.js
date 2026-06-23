// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 *
 * The SDK accepts any object implementing the Logger interface (debug, info, warn, error).
 * Pass it via the `logger` option on SinchClient as it is wrapped in SinchLogger automatically.
 *
 * Example with Winston (https://www.npmjs.com/package/winston or npm install winston):
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

const appLogger = {
  debug: (message, ...meta) => console.debug(message, ...meta),
  info: (message, ...meta) => console.info(message, ...meta),
  warn: (message, ...meta) => console.warn(message, ...meta),
  error: (message, ...meta) => console.error(message, ...meta),
};

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'MY_KEY_SECRET';

  // conversationRegion is intentionally omitted to trigger an SDK deprecation warning
  // and show the custom logger in action
  const sinch = new SinchClient({ projectId, keyId, keySecret, logger: appLogger });

  try {
    await sinch.conversation.app.list({});
    console.log('✅ SDK request completed.');
  } catch (err) {
    console.error('❌ Failed to call the Conversation API:');
    console.error(err);
  }
}

main();
