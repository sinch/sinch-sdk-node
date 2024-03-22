import {
  CreateGroupResponse,
  ListGroupsRequestData,
  PageResult,
  SmsService,
} from '@sinch/sdk-core';
import { getPrintFormat, printFullResponse } from '../../../config';

const populateGroupsList = (
  groupsPage: PageResult<CreateGroupResponse>,
  fullGroupsList: CreateGroupResponse[],
  groupsList: string[],
) => {
  // Populate the data structure that holds the response content
  fullGroupsList.push(...groupsPage.data);
  // Populate the data structure that holds the response content for pretty print
  groupsPage.data.map((group: CreateGroupResponse) => {
    groupsList.push(`Group ID: ${group.id} - Group name: ${group.name}`);
  });
};

export const list = async(smsService: SmsService) => {
  console.log('**************');
  console.log('* ListGroups *');
  console.log('**************');

  const requestData: ListGroupsRequestData = {
    page_size: 1,
  };

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response;
  try {
    response = await smsService.groups.list(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to list the groups associated to your service plan id`);
    throw error;
  }

  // Init data structure to hold the response content
  const fullGroupsList: CreateGroupResponse[] = [];
  // Init data structure to hold the response content for pretty print
  const groupsList: string[] = [];

  // Loop on all the pages to get all the groups
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateGroupsList(response, fullGroupsList, groupsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(groupsList.length > 0
      ? 'List of members: ' + JSON.stringify(groupsList, null, 2)
      : 'Sorry, no members in groups were found.');
  } else {
    printFullResponse(fullGroupsList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const group of smsService.groups.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`Group ID: ${group.id} - Group name: ${group.name}`);
    } else {
      console.log(group);
    }
  }

};


