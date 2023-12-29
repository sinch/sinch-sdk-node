import { SinchClient, GetGroupRequestData } from '@sinch/sdk-core';
import { getGroupIdFromConfig, getPrintFormat, printFullResponse } from '../../../config';

export const get = async(sinchClient: SinchClient) => {
  console.log('*****************');
  console.log('* RetrieveGroup *');
  console.log('*****************');

  const groupId = getGroupIdFromConfig();

  const requestData: GetGroupRequestData = {
    group_id: groupId,
  };

  let response;
  try {
    response = await sinchClient.sms.groups.get(requestData);
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
