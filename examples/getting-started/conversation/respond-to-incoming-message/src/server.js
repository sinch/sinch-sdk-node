import express from 'express';
import { conversationController } from './conversation/controller.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

/** @type {import('@sinch/sdk-core').SinchClientParameters} */
const sinchClientParameters = {
  projectId: process.env.SINCH_PROJECT_ID,
  keyId: process.env.SINCH_KEY_ID,
  keySecret: process.env.SINCH_KEY_SECRET,
  conversationRegion: process.env.SINCH_CONVERSATION_REGION,
};

app.use(express.json());

conversationController(app, sinchClientParameters);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
