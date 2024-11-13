import {
  getMailgunDomainFromConfig,
  getMailgunStorageKeyFromConfig,
  initMailgunService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('************');
  console.log('* GetEmail *');
  console.log('************');

  const domainName = getMailgunDomainFromConfig();
  const storageKey = getMailgunStorageKeyFromConfig();

  const mailgunService = initMailgunService();
  let response;
  try {
    response = await mailgunService.emails.getEmail(domainName, storageKey);
  } catch (error) {
    console.error('Error when retrieving a message');
    throw error;
  }

  printFullResponse(response);

})();
