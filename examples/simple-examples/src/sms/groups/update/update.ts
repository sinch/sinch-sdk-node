import { SmsService, UpdateGroupRequestData } from '@sinch/sdk-core';
import { getGroupIdFromConfig, getPrintFormat, printFullResponse } from '../../../config';

export const update = async(smsService: SmsService) => {
  console.log('***************');
  console.log('* UpdateGroup *');
  console.log('***************');

  const groupId = getGroupIdFromConfig();

  const requestData: UpdateGroupRequestData = {
    group_id: groupId,
    updateGroupRequestBody: {
      name: `update_${new Date().getTime()}`,
      add: [
        '+123456789',
        '+987654321',
      ],
    },
  };

  let response;
  try {
    response = await smsService.groups.update(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to update the group ${requestData.group_id}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The group ${response.id} has been updated and has now the name '${response.name}' and contains ${response.size} member(s)`);
  } else {
    printFullResponse(response);
  }

};
