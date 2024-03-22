import { DeleteEmailRequestData } from '@sinch/sdk-core';
import { getFaxEmailFromConfig, initFaxService } from '../../config';

(async () => {
  console.log('***************');
  console.log('* deleteEmail *');
  console.log('***************');

  const email = getFaxEmailFromConfig();

  const requestData: DeleteEmailRequestData = {
    email,
  };

  const faxService = initFaxService();
  await faxService.emails.delete(requestData);

  console.log(`The email '${requestData.email}' has been successfully removed`);
})();
