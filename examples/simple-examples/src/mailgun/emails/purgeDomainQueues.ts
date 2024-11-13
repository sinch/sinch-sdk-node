import { getMailgunDomainFromConfig, initMailgunService, printFullResponse } from '../../config';

(async () => {
  console.log('*********************');
  console.log('* PurgeDomainQueues *');
  console.log('*********************');

  const domainName = getMailgunDomainFromConfig();

  const mailgunService = initMailgunService();
  let response;
  try {
    response = await mailgunService.emails.purgeDomainQueues(domainName);
  } catch (error) {
    console.error('Error when trying to purge the domain queues');
    throw error;
  }

  printFullResponse(response);

})();
