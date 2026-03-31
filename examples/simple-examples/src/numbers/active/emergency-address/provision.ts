import {
  getPhoneNumberFromConfig,
  initNumbersService,
  printFullResponse,
} from '../../../config';
import { Numbers } from '@sinch/sdk-core';
import { EmergencyAddress } from '@sinch/numbers/src/models';

(async () => {
  console.log('*****************************');
  console.log('* ProvisionEmergencyAddress *');
  console.log('*****************************');

  const phoneNumber = getPhoneNumberFromConfig();

  const requestData: Numbers.ProvisionEmergencyAddressRequestData = {
    phoneNumber,
    emergencyAddressRequestBody: {
      displayName: 'JustInCase911',
      address: {
        streetNumber: '41',
        streetInfo: 'Warwick Rd',
        city: 'Watertown',
        state: 'MA',
        postalCode: '02472',
      },
    },
  };

  const numbersService = initNumbersService();
  let response: EmergencyAddress;
  try {
    response = await numbersService.provisionEmergencyAddress(requestData);
  } catch (error) {
    console.error(`ERROR: Cannot provision this emergency address for the number ${requestData.phoneNumber}`);
    throw error;
  }

  printFullResponse(response);

})();
