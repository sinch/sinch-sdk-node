import { SinchClient } from '@sinch/sdk-core';
import { VerificationSample } from './verification/verificationSample.js';
import * as dotenv from 'dotenv';
dotenv.config();

const sinchClient = new SinchClient({
  applicationKey: process.env.SINCH_APPLICATION_KEY,
  applicationSecret: process.env.SINCH_APPLICATION_SECRET,
});

new VerificationSample(sinchClient.verification).start();
