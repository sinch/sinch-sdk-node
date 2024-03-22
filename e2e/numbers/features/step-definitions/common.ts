import { UnifiedCredentials } from '@sinch/sdk-client';
import { NumbersService } from '@sinch/sdk-core';

export const initParameters = (): UnifiedCredentials => {
  return {
    projectId: 'projectId',
    keyId: 'keyId',
    keySecret: 'keySecret',
  };
};

export const initNumbersService = (): NumbersService => {
  const numbersService = new NumbersService(initParameters());
  numbersService.setBasePath('http://localhost:5040');
  return numbersService;
};
