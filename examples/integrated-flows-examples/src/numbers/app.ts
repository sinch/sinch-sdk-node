import {
  SinchClient,
  Numbers,
} from '@sinch/sdk-core';
import dotenv from 'dotenv';
dotenv.config();

(async() => {

  // Scenario: We need a 'LOCAL' number.
  // We'll first search for the regions where such option is available
  // We'll then search for one available number and rent it. We will also rent another number base on pattern search.
  // We'll then verify they are part of our active numbers, update their configuration and finally release them.
  // The final step will be to verify the numbers are not listed as active anymore

  const projectId = process.env.SINCH_PROJECT_ID || '';
  const keyId = process.env.SINCH_KEY_ID || '';
  const keySecret = process.env.SINCH_KEY_SECRET || '';
  const sinchClient = new SinchClient({ projectId, keyId, keySecret });

  const regionType: Numbers.RegionNumberTypeEnum = 'LOCAL';
  const type: Numbers.NumberTypeEnum = 'LOCAL';

  console.log('+------------------------------------------------------------------------------+');
  console.log('| Step 1: List the available regions and store the first one from the response |');
  console.log('+------------------------------------------------------------------------------+');

  // Build the request data
  const availableRegionsRequestData: Numbers.ListAvailableRegionsRequestData = {
    types: [regionType],
  };

  // Declare the variable holding the response
  let availableRegionsResponse;
  try {
    // Send the HTTP request with the SDK method
    availableRegionsResponse
    = await sinchClient.numbers.availableRegions.list(availableRegionsRequestData);
  } catch (error) {
    // Catch error if any, log it and stop the program
    console.error(`ERROR: An error occurred when trying to list the available regions for the type ${regionType}`);
    throw error;
  }

  // Check the response contains some data
  if (!availableRegionsResponse.availableRegions
    || availableRegionsResponse.availableRegions.length === 0) {
    console.log(`ERROR: No available regions for the type ${regionType}`);
    return;
  }
  // Store the region code to reuse it in subsequent requests
  const regionCode: string
    = availableRegionsResponse.availableRegions[availableRegionsResponse.availableRegions.length-1].regionCode!;
  console.log(`Region code = ${regionCode}\n`);

  console.log('+-----------------------------------------------+');
  console.log('| Step 2: List available numbers in this region |');
  console.log('+-----------------------------------------------+');

  // Build the request data
  const listAvailableNumbersRequestData: Numbers.ListAvailableNumbersRequestData = {
    regionCode,
    type,
  };

  // Declare the variable holding the response
  let availableNumbersResponse;
  try {
    // Send the HTTP request with the SDK method
    availableNumbersResponse
    = await sinchClient.numbers.availableNumber.list(listAvailableNumbersRequestData);
  } catch (error) {
    // Catch error if any, log it and stop the program
    console.error(`ERROR: An error occurred when trying to list the available numbers for the type ${type}`);
    throw error;
  }

  // Check the response contains some data
  if (!availableNumbersResponse.availableNumbers
    || availableNumbersResponse.availableNumbers.length === 0) {
    console.log(`ERROR: No available numbers for the type ${type}`);
    return;
  }

  // Store the phone number to reuse it in subsequent requests
  const phoneNumber1 = availableNumbersResponse.availableNumbers[0].phoneNumber!;
  console.log(`The number ${phoneNumber1} is available.\n`);

  console.log('+-------------------------------+');
  console.log('| Step 3: Rent the phone number |');
  console.log('+-------------------------------+');

  // Build the request data
  const rentNumberRequestData: Numbers.RentNumberRequestData = {
    phoneNumber: phoneNumber1,
    rentNumberRequestBody: {},
  };

  // Declare the variable holding the response
  let rentNumberResponse;
  try {
    // Send the HTTP request with the SDK method
    rentNumberResponse = await sinchClient.numbers.availableNumber.rent(rentNumberRequestData);
  } catch (error) {
    // Catch error if any, log it and stop the program
    console.error(`ERROR: Impossible to rent the number ${phoneNumber1}`);
    throw error;
  }
  console.log(`Number ${phoneNumber1} has been rented. The next charge date is ${rentNumberResponse.nextChargeDate}\n`);

  console.log('+------------------------------------------------------------+');
  console.log('| Step 2+3 bis: Rent a number directly from a search pattern |');
  console.log('+------------------------------------------------------------+');

  // Build the request data
  const rentAnyNumberRequestData: Numbers.RentAnyNumberRequestData = {
    rentAnyNumberRequestBody: {
      regionCode,
      type,
      capabilities: ['SMS'],
      numberPattern: {
        searchPattern: 'START',
        pattern: '+1781',
      },
    },
  };

  // Declare the variable holding the response
  let rentAnyNumberResponse;
  try {
    // Send the HTTP request with the SDK method
    rentAnyNumberResponse = await sinchClient.numbers.availableNumber.rentAny(rentAnyNumberRequestData);
  } catch (error) {
    // Catch error if any, log it and stop the program
    console.error(`ERROR: Impossible to rent a number in the region ${regionCode} of type ${type}`);
    throw error;
  }
  // Store the phone number to reuse it in subsequent requests
  const phoneNumber2 = rentAnyNumberResponse.phoneNumber!;
  console.log(`Number ${phoneNumber2} has been rented. The next charge date is ${rentAnyNumberResponse.nextChargeDate}\n`);

  console.log('+-----------------------------------------------------------------------------------------------+');
  console.log('| Step 4: Check the numbers are part of our active numbers - method 1: give the number in input |');
  console.log('+-----------------------------------------------------------------------------------------------+');

  // Build the request data
  const getActiveNumberRequestData: Numbers.GetActiveNumberRequestData = {
    phoneNumber: phoneNumber1,
  };

  // Declare the variable holding the response
  let getActiveNumberResponse;
  try {
    // Send the HTTP request with the SDK method
    getActiveNumberResponse = await sinchClient.numbers.activeNumber.get(getActiveNumberRequestData);
  } catch (error) {
    // Catch error if any, log it and stop the program
    console.error(`ERROR: Impossible to get details for the number ${phoneNumber1}`);
    throw error;
  }
  console.log(`SUCCESS: The number ${phoneNumber1} is found as an active number. Cost is ${getActiveNumberResponse.money?.amount} ${getActiveNumberResponse.money?.currencyCode}\n`);

  console.log('+----------------------------------------------------------------------------------------------+');
  console.log('| Step 4: Check the numbers are part of our active numbers - method 2: List all active numbers |');
  console.log('+----------------------------------------------------------------------------------------------+');

  // Build the request data
  const listActiveNumbersRequestData: Numbers.ListActiveNumbersRequestData = {
    regionCode,
    type,
  };

  // The ActiveNumbersResponse is paginated. Let's fetch all the pages using the iterator functionality
  const activeNumbersList: Numbers.ActiveNumber[] = [];
  for await (const activeNumber of sinchClient.numbers.activeNumber.list(listActiveNumbersRequestData)) {
    activeNumbersList.push(activeNumber);
  }

  // Check our numbers are part of the response
  const number1IsListedInActiveNumbers
    = activeNumbersList.some((activeNumber) => activeNumber.phoneNumber === phoneNumber1);
  const number2IsListedInActiveNumbers
    = activeNumbersList.some((activeNumber) => activeNumber.phoneNumber === phoneNumber2);
  console.log(`The number ${phoneNumber1} is ${number1IsListedInActiveNumbers? '' : 'NOT '}listed in the active numbers`);
  console.log(`The number ${phoneNumber2} is ${number2IsListedInActiveNumbers? '' : 'NOT '}listed in the active numbers\n`);

  console.log('+---------------------------------+');
  console.log('| Step 5: Update an active number |');
  console.log('+---------------------------------+');

  // Build the request data
  const updateActiveNumberRequestData: Numbers.UpdateActiveNumberRequestData = {
    phoneNumber: phoneNumber1,
    updateActiveNumberRequestBody: {
      displayName: 'Sample number 1',
    },
  };

  // Declare the variable holding the response
  let updateActiveNumberResponse;
  try {
    // Send the HTTP request with the SDK method
    updateActiveNumberResponse
      = await sinchClient.numbers.activeNumber.update(updateActiveNumberRequestData);
  } catch (error) {
    // Catch error if any, log it and stop the program
    console.log(`ERROR: Impossible to update the number ${phoneNumber1}`);
    throw error;
  }

  console.log(`SUCCESS: The number ${phoneNumber1} has been updated; the display name is '${updateActiveNumberResponse.displayName}'\n`);

  console.log('+---------------------------------------+');
  console.log('| Step 6: Release the numbers - number1 |');
  console.log('+---------------------------------------+');

  // Build the request data
  let releaseActiveNumberRequestData: Numbers.ReleaseNumberRequestData = {
    phoneNumber: phoneNumber1,
  };

  let releaseActiveNumberResponse;
  try {
    // Send the HTTP request with the SDK method
    releaseActiveNumberResponse = await sinchClient.numbers.activeNumber.release(releaseActiveNumberRequestData);
  } catch (error) {
    // Catch error if any, log it and stop the program
    console.error(`ERROR: Impossible to release the number ${phoneNumber1}`);
    throw error;
  }

  console.log(`SUCCESS: The number ${phoneNumber1} has been released; it will expire at ${releaseActiveNumberResponse.expireAt}\n`);

  console.log('+-------------------------------------------+');
  console.log('| Step 6 bis: Release the numbers - number2 |');
  console.log('+-------------------------------------------+');

  releaseActiveNumberRequestData = {
    phoneNumber: phoneNumber2,
  };

  try {
    // Send the HTTP request with the SDK method
    releaseActiveNumberResponse = await sinchClient.numbers.activeNumber.release(releaseActiveNumberRequestData);
  } catch (error) {
    // Catch error if any, log it and stop the program
    console.error(`ERROR: Impossible to release the number ${phoneNumber2}`);
    throw error;
  }

  console.log(`SUCCESS: The number ${phoneNumber2} has been released; it will expire at ${releaseActiveNumberResponse.expireAt}`);

})();
