import { getMailgunDomainFromConfig, initMailgunService } from '../../config';

(async () => {
  console.log('*********************');
  console.log('* PurgeSendingQueue *');
  console.log('*********************');

  const domainName = getMailgunDomainFromConfig();

  const mailgunService = initMailgunService();
  try {
    await mailgunService.emails.purgeSendingQueue(domainName, 'https://storage-us-west1.api.mailgun.net');
  } catch (error) {
    console.error('Error when trying to purge the sending queue');
    throw error;
  }

  console.log('The sending queue has been purged');

})();
