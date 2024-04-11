import { Sms, SmsService } from '@sinch/sdk-core';
import { getGroupIdFromConfig, getPrintFormat, printFullResponse } from '../../../config';

export const get = async(smsService: SmsService) => {
  console.log('*****************');
  console.log('* RetrieveGroup *');
  console.log('*****************');

  const groupId = getGroupIdFromConfig();

  const requestData: Sms.GetGroupRequestData = {
    group_id: groupId,
  };

  let response;
  try {
    response = await smsService.groups.get(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to get the group ${requestData.group_id}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Group ID: ${response.id} - Group name: ${response.name}`);
  } else {
    printFullResponse(response);
  }
};
