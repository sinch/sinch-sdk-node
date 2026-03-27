import express from 'express';
import { smsController } from './sms/controller.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

/** @type {import('@sinch/sdk-core').SinchClientParameters} */
const sinchClientParameters = {
  projectId: process.env.SINCH_PROJECT_ID,
  keyId: process.env.SINCH_KEY_ID,
  keySecret: process.env.SINCH_KEY_SECRET,
  servicePlanId: process.env.SINCH_SERVICE_PLAN_ID,
  apiToken: process.env.SINCH_API_TOKEN,
  smsRegion: process.env.SINCH_SMS_REGION,
};

app.use(express.json());

smsController(app, sinchClientParameters);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
