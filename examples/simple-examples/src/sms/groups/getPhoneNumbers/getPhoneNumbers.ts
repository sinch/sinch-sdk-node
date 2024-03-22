import { ListMembersRequestData, SmsService } from '@sinch/sdk-core';
import { getGroupIdFromConfig, getPrintFormat, printFullResponse } from '../../../config';

export const getPhoneNumbers = async(smsService: SmsService) => {
  console.log('**************');
  console.log('* GetMembers *');
  console.log('**************');

  const groupId = getGroupIdFromConfig();

  const requestData: ListMembersRequestData = {
    group_id: groupId,
  };

  let response;
  try {
    response = await smsService.groups.listMembers(requestData);
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
