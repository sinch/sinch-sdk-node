import { SinchClient } from '@sinch/sdk-core';
import { SmsSample } from './sms/smsSample.js';
import * as dotenv from 'dotenv';

dotenv.config();

const sinchClient = new SinchClient({
  projectId: process.env.SINCH_PROJECT_ID,
  keyId: process.env.SINCH_KEY_ID,
  keySecret: process.env.SINCH_KEY_SECRET,
  smsRegion: process.env.SINCH_SMS_REGION,
});

new SmsSample(sinchClient.sms).start();
