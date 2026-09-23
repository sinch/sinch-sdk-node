import {
  getPhoneNumberFromConfig,
  initNumbersService,
  printFullResponse,
} from '../../../config';
import { Numbers } from '@sinch/sdk-core';

(async () => {
  console.log('***********************');
  console.log('* GetEmergencyAddress *');
  console.log('***********************');

  const phoneNumber = getPhoneNumberFromConfig();

  const requestData: Numbers.GetEmergencyAddressRequestData = {
    phoneNumber,
  };

  const numbersService = initNumbersService();
  let response: Numbers.EmergencyAddress;
  try {
    response = await numbersService.getEmergencyAddress(requestData);
  } catch (error) {
    console.error(`ERROR: Cannot retrieve the emergency address for the number ${requestData.phoneNumber}`);
    throw error;
  }

  printFullResponse(response);

})();
