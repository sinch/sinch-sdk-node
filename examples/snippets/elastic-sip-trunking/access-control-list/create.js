/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'MY_KEY_SECRET';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.elasticSipTrunking.accessControlList.create({
      createAccessControlListBody: {
        name: 'My new ACL',
        ipRanges: [
          {
            description: 'Location 1',
            ipAddress: '15.15.15.15',
            range: 20,
          },
        ],
      },
    });
    console.log('✅ Successfully created the ACL.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error('❌ Failed to create the ACL:');
    console.error(err);
  }
}

main();
