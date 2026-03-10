import { SinchClient } from '@sinch/sdk-core';
import { ConversationSample } from './conversation/conversationSample.js';
import * as dotenv from 'dotenv';

dotenv.config();

const sinchClient = new SinchClient({
  projectId: process.env.SINCH_PROJECT_ID,
  keyId: process.env.SINCH_KEY_ID,
  keySecret: process.env.SINCH_KEY_SECRET,
  conversationRegion: process.env.SINCH_CONVERSATION_REGION,
});

new ConversationSample(sinchClient.conversation).start();
