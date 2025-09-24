import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { NumbersService } from '../../../../src';
import { EmergencyAddressValidationResultCode, EmergencyAddress, ValidateEmergencyAddressResponse } from '../../../../src/models';

let numbersService: NumbersService;
let validateEmergencyAddressResponse: ValidateEmergencyAddressResponse;
let emergencyAddress: EmergencyAddress;
let deprovisionEmergencyAddressResponse: void;

Given('the Numbers service is available to handle emergency addresses', function() {
  numbersService = new NumbersService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    numbersHostname: 'http://localhost:3013',
  });
});

When('I send a request to validate an emergency address', async () => {
  validateEmergencyAddressResponse = await numbersService.validateEmergencyAddress({
    phoneNumber: '+12015555555',
    emergencyAddressRequestBody: {
      displayName: 'Validate emergency address',
      address: {
        streetNumber: '3500',
        streetInfo: 'Lenox Road NE',
        city: 'Atlanta',
        state: 'GA',
        postalCode: '30326',
      },
    },
  });
});

Then('the response contains the corrected address', () => {
  assert.equal(validateEmergencyAddressResponse.phoneNumber, '+12015555555');
  assert.equal(validateEmergencyAddressResponse.displayName, 'Validate emergency address');
  const expectedValidationResult: EmergencyAddressValidationResultCode = 'NEAR_MATCH';
  assert.equal(validateEmergencyAddressResponse.validationResult, expectedValidationResult);
  assert.equal(validateEmergencyAddressResponse.validationMessage,
    'Corrected to valid address|Corrected address abbreviations');
  const expectedValidatedAddress: EmergencyAddress = {
    streetNumber: '3500',
    streetInfo: 'Lenox Road NE',
    location: '',
    city: 'Atlanta',
    state: 'GA',
    postalCode: '30326',
    postalCodePlusFour: '',
  };
  assert.deepEqual(validateEmergencyAddressResponse.validatedAddress, expectedValidatedAddress);
  const expectedCorrectedAddress: EmergencyAddress = {
    streetNumber: '3500',
    streetInfo: 'Lenox Rd NE',
    location: '',
    city: 'Atlanta',
    state: 'GA',
    postalCode: '30326',
    postalCodePlusFour: '',
  };
  assert.deepEqual(validateEmergencyAddressResponse.correctedAddress, expectedCorrectedAddress);
});

When('I send a request to validate an approximate emergency address', async () => {
  validateEmergencyAddressResponse = await numbersService.validateEmergencyAddress({
    phoneNumber: '+12015555555',
    emergencyAddressRequestBody: {
      displayName: 'Validate emergency address',
      address: {
        streetNumber: '3500',
        streetInfo: 'Lenox Road',
        city: 'Atlanta',
        state: 'GA',
        postalCode: '30326',
      },
    },
  });
});

Then('the response contains the candidate address', () => {
  assert.equal(validateEmergencyAddressResponse.phoneNumber, '+12015555555');
  assert.equal(validateEmergencyAddressResponse.displayName, 'Validate emergency address');
  const expectedValidationResult: EmergencyAddressValidationResultCode = 'NO_MATCH';
  assert.equal(validateEmergencyAddressResponse.validationResult, expectedValidationResult);
  assert.equal(validateEmergencyAddressResponse.validationMessage,
    'Invalid address - no correction found|Changed address component|Corrected address abbreviations'
    + '|Address is Invalid');
  const expectedValidatedAddress: EmergencyAddress = {
    streetNumber: '3500',
    streetInfo: 'Lenox Road',
    location: '',
    city: 'Atlanta',
    state: 'GA',
    postalCode: '30326',
    postalCodePlusFour: '',
  };
  assert.deepEqual(validateEmergencyAddressResponse.validatedAddress, expectedValidatedAddress);
  const expectedCorrectedAddress: EmergencyAddress = {
    streetNumber: '',
    streetInfo: '',
    location: '',
    city: '',
    state: '',
    postalCode: '',
    postalCodePlusFour: '',
  };
  assert.deepEqual(validateEmergencyAddressResponse.correctedAddress, expectedCorrectedAddress);
  const expectedCandidateAddress: EmergencyAddress[] = [{
    streetNumber: '3500',
    streetInfo: 'Lenox Rd NE',
    location: '',
    city: 'Atlanta',
    state: 'GA',
    postalCode: '30326',
    postalCodePlusFour: '',
  }];
  assert.deepEqual(validateEmergencyAddressResponse.candidateAddresses, expectedCandidateAddress);
});

When('I send a request to provision an emergency address', async () => {
  emergencyAddress = await numbersService.provisionEmergencyAddress({
    phoneNumber: '+12015555555',
    emergencyAddressRequestBody: {
      displayName: 'Set emergency address',
      address: {
        streetNumber: '3500',
        streetInfo: 'Lenox Rd NE',
        city: 'Atlanta',
        state: 'GA',
        postalCode: '30326',
      },
    },
  });
});

Then('the response contains the provisioned emergency address', () => {
  const expectedEmergencyAddress: EmergencyAddress = {
    streetNumber: '3500',
    streetInfo: 'Lenox Rd NE',
    location: '',
    city: 'Atlanta',
    state: 'GA',
    postalCode: '30326',
    postalCodePlusFour: '',
  };
  assert.deepEqual(emergencyAddress, expectedEmergencyAddress);
});

When('I send a request to deprovision an emergency address', async () => {
  deprovisionEmergencyAddressResponse = await numbersService.deprovisionEmergencyAddress({
    phoneNumber: '+12015555555',
  });
});

Then('the response indicates successful deprovisioning', () => {
  assert.deepEqual(deprovisionEmergencyAddressResponse, {});
});

When('I send a request to get the emergency address for a number', async () => {
  emergencyAddress = await numbersService.getEmergencyAddress({
    phoneNumber: '+12015555555',
  });
});

Then('the response contains the provisioned emergency address for the phone number', () => {
  const expectedEmergencyAddress: EmergencyAddress = {
    streetNumber: '3500',
    streetInfo: 'Lenox Rd NE',
    location: '',
    city: 'Atlanta',
    state: 'GA',
    postalCode: '30326',
    postalCodePlusFour: '',
  };
  assert.deepEqual(emergencyAddress, expectedEmergencyAddress);
});
