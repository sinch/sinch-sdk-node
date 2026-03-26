import { SinchClient } from '@sinch/sdk-core';
import { VoiceSample } from './voice/voiceSample.js';
import * as dotenv from 'dotenv';

dotenv.config();

const sinchClient = new SinchClient({
  applicationKey: process.env.SINCH_APPLICATION_KEY,
  applicationSecret: process.env.SINCH_APPLICATION_SECRET,
});

new VoiceSample(sinchClient.voice).start();
