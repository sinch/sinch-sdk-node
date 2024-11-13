import { getMailgunDomainFromConfig, initMailgunService, printFullResponse } from '../../config';

(async () => {
  console.log('**************************');
  console.log('* GetSendingQueuesStatus *');
  console.log('**************************');

  const domainName = getMailgunDomainFromConfig();

  const mailgunService = initMailgunService();
  let response;
  try {
    response = await mailgunService.emails.getSendingQueuesStatus(domainName);
  } catch (error) {
    console.error('Error when fetching the sending queue status');
    throw error;
  }

  printFullResponse(response);

})();
