/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'MY_KEY_SECRET';
  const conversationRegion = process.env.SINCH_CONVERSATION_REGION ?? 'MY_CONVERSATION_REGION';

  // The ID of the Contact to merge into
  const destinationContactId = 'DESTINATION_CONTACT_ID';
  // The source Contact will be merged into the destination Contact and then deleted
  const sourceContactId = 'SOURCE_CONTACT_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.contact.mergeContact({
      destination_id: destinationContactId,
      mergeContactRequestBody: {
        source_id: sourceContactId,
      },
    });
    console.log('✅ Successfully merged the Contacts.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to merge the Contact with ID ${sourceContactId} into the Contact with ID ${destinationContactId}:`);
    console.error(err);
  }
}

main();
