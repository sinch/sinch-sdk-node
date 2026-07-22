import { SinchClient } from '@sinch/sdk-core';
import { FaxSample } from './fax/faxSample.js';
import * as dotenv from 'dotenv';

dotenv.config();

const sinchClient = new SinchClient({
  projectId: process.env.SINCH_PROJECT_ID,
  keyId: process.env.SINCH_KEY_ID,
  keySecret: process.env.SINCH_KEY_SECRET,
});

new FaxSample(sinchClient.fax).start();
