import { Fax } from '@sinch/sdk-core';
import {
  getFaxServiceIdFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat,
  initFaxService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*****************');
  console.log('* suspendNumber *');
  console.log('*****************');

  const phoneNumber = getPhoneNumberFromConfig();
  const serviceId = getFaxServiceIdFromConfig();

  const requestData: Fax.SuspendNumberRequestData = {
    serviceId,
    phoneNumber,
    suspendNumberRequestBody: {
      suspended: true,
      note: 'Reason for suspending the number.',
    },
  };

  const faxService = initFaxService();
  const response = await faxService.services.suspendNumber(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The number '${response.phoneNumber}' is now ${response.suspended ? 'suspended' : 'active'}`);
  } else {
    printFullResponse(response);
  }
})();
