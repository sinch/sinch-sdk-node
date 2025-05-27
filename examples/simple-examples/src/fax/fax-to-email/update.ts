import { Fax } from '@sinch/sdk-core';
import {
  getFaxEmailFromConfig,
  getFaxServiceIdFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat,
  initFaxService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*************************');
  console.log('* createEmailForProject *');
  console.log('*************************');

  const phoneNumber = getPhoneNumberFromConfig();
  const serviceId = getFaxServiceIdFromConfig();
  const email = getFaxEmailFromConfig();

  const requestData: Fax.UpdateEmailRequestData = {
    serviceId,
    email,
    updateEmailRequestBody: {
      phoneNumbers: [
        {
          number: phoneNumber,
          permissions: 'both',
        },{
          number: '+14155552222',
          permissions: 'receive',
        },
      ],
    },
  };

  const faxService = initFaxService();
  const response = await faxService.faxToEmail.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Email successfully updated with numbers '${response.phoneNumbers?.join(', ')}'`);
  } else {
    printFullResponse(response);
  }
})();
