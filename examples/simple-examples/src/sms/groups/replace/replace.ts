import { ReplaceGroupRequestData, SinchClient } from '@sinch/sdk-core';
import { getGroupIdFromConfig, getPrintFormat, printFullResponse } from '../../../config';

export const replace = async(sinchClient: SinchClient) => {
  console.log('****************');
  console.log('* ReplaceGroup *');
  console.log('****************');

  const groupId = getGroupIdFromConfig();

  const requestData: ReplaceGroupRequestData = {
    group_id: groupId,
    replaceGroupRequestBody: {
      members: [
        '+111111111',
        '+222222222',
      ],
    },
  };

  let response;
  try {
    response = await sinchClient.sms.groups.replace(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to replace the group ${requestData.group_id}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The group ${response.id} has been replaced and contains now ${response.size} member(s)`);
  } else {
    printFullResponse(response);
  }

};
