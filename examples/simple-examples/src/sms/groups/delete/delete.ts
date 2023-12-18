import { SinchClient, DeleteGroupRequestData } from '@sinch/sdk-core';
import { getGroupIdFromConfig } from '../../../config';

export const deleteGroup = async(sinchClient: SinchClient) => {
  console.log('***************');
  console.log('* deleteGroup *');
  console.log('***************');

  const groupId = getGroupIdFromConfig();
  if (!groupId) {
    throw new Error('No group id has been provided. '
      + 'Please update your .env file or edit the ./src/sms/groups/delete.ts file');
  }

  const requestData: DeleteGroupRequestData = {
    group_id: groupId,
  };

  try {
    await sinchClient.sms.groups.delete(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to delete the group ${requestData.group_id}`);
    throw error;
  }

  console.log(`Group ${requestData.group_id} has been deleted!`);
};
