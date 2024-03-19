import { CreateGroupRequestData, SmsService } from '@sinch/sdk-core';
import { getPrintFormat, printFullResponse } from '../../../config';

export const create = async(smsService: SmsService) => {
  console.log('***************');
  console.log('* CreateGroup *');
  console.log('***************');

  const requestData: CreateGroupRequestData = {
    createGroupRequestBody: {
      name: `Group_${new Date().getTime()}`,
      members: [
        "+11111111100",
        "+22222222200",
        "+33333333300",
      ],
    },
  };

  let response;
  try {
    response = await smsService.groups.create(requestData);
  } catch (error) {
    console.error('ERROR: Impossible to create a new group');
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New group created! Group ID: ${response.id} - Group name: ${response.name}`);
  } else {
    printFullResponse(response);
  }
  console.log(`You may want to update your .env file with the following value: GROUP_ID=${response.id}`);
};
