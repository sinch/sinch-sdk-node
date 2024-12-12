import { getMailgunDomainFromConfig, initMailgunService, printFullResponse } from '../../config';

(async () => {
  console.log('********************');
  console.log('* PurgeDomainQueue *');
  console.log('********************');

  const domainName = getMailgunDomainFromConfig();

  const mailgunService = initMailgunService();
  let response;
  try {
    response = await mailgunService.emails.purgeDomainQueue(domainName, 'https://storage-us-west1.api.mailgun.net');
  } catch (error) {
    console.error('Error when trying to purge the domain queue');
    throw error;
  }

  printFullResponse(response);

})();
