import {
  getPhoneNumberFromConfig,
  initNumbersService,
} from '../../../config';
import { Numbers } from '@sinch/sdk-core';

(async () => {
  console.log('*******************************');
  console.log('* DeprovisionEmergencyAddress *');
  console.log('*******************************');

  const phoneNumber = getPhoneNumberFromConfig();

  const requestData: Numbers.DeprovisionEmergencyAddressRequestData = {
    phoneNumber,
  };

  const numbersService = initNumbersService();
  try {
    await numbersService.deprovisionEmergencyAddress(requestData);
  } catch (error) {
    console.error(`ERROR: Cannot deprovision the number ${requestData.phoneNumber}`);
    throw error;
  }

  console.log(`The emergency address has been successfully deprovisioned from the number ${phoneNumber}.`);

})();
