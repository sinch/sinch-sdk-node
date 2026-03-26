import { SinchClient } from '@sinch/sdk-core';
import { NumbersSample } from './numbers/numbersSample.js';
import * as dotenv from 'dotenv';

dotenv.config();

const sinchClient = new SinchClient({
  projectId: process.env.SINCH_PROJECT_ID,
  keyId: process.env.SINCH_KEY_ID,
  keySecret: process.env.SINCH_KEY_SECRET,
});

new NumbersSample(sinchClient.numbers).start();
