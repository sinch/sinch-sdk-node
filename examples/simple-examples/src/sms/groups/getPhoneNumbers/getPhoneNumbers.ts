import { ListMembersRequestData, SinchClient } from '@sinch/sdk-core';
import { getGroupIdFromConfig, getPrintFormat, printFullResponse } from '../../../config';

export const getPhoneNumbers = async(sinchClient: SinchClient) => {
  console.log('**************');
  console.log('* GetMembers *');
  console.log('**************');

  const groupId = getGroupIdFromConfig();
  if (!groupId) {
    throw new Error('No group id has been provided. '
      + 'Please update your .env file or edit the ./src/sms/groups/getPhoneNumbers.ts file');
  }

  const requestData: ListMembersRequestData = {
    group_id: groupId,
  };

  let response;
  try {
    response = await sinchClient.sms.groups.listMembers(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to get the numbers of the group ${requestData.group_id}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(response.length > 0
      ? 'List of phone numbers: ' + JSON.stringify(response, null, 2)
      : `Sorry, no phone numbers in group ${requestData.group_id} were found.`);
  } else {
    printFullResponse(response);
  }
};
