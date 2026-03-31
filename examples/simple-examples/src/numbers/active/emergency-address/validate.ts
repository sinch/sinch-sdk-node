import {
  getPhoneNumberFromConfig,
  initNumbersService,
  printFullResponse,
} from '../../../config';
import { Numbers } from '@sinch/sdk-core';
import { ValidateEmergencyAddressResponse } from '@sinch/numbers/src/models';

(async () => {
  console.log('****************************');
  console.log('* ValidateEmergencyAddress *');
  console.log('****************************');

  const phoneNumber = getPhoneNumberFromConfig();

  const requestData: Numbers.ValidateEmergencyAddressRequestData = {
    phoneNumber,
    emergencyAddressRequestBody: {
      displayName: 'JustInCase911',
      address: {
        streetNumber: '41',
        streetInfo: 'Warwick Road',
        city: 'Watertown',
        state: 'MA',
        postalCode: '02472',
      },
    },
  };

  const numbersService = initNumbersService();
  let response: ValidateEmergencyAddressResponse;
  try {
    response = await numbersService.validateEmergencyAddress(requestData);
  } catch (error) {
    console.error(`ERROR: Cannot validate this emergency address for the number ${requestData.phoneNumber}`);
    throw error;
  }

  printFullResponse(response);

})();
