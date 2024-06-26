import { Sms, SmsService } from '@sinch/sdk-core';
import { getGroupIdFromConfig } from '../../../config';

export const deleteGroup = async(smsService: SmsService) => {
  console.log('***************');
  console.log('* deleteGroup *');
  console.log('***************');

  const groupId = getGroupIdFromConfig();

  const requestData: Sms.DeleteGroupRequestData = {
    group_id: groupId,
  };

  try {
    await smsService.groups.delete(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to delete the group ${requestData.group_id}`);
    throw error;
  }

  console.log(`Group ${requestData.group_id} has been deleted!`);
};
