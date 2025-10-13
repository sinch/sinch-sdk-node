import { SinchClientParameters } from '@sinch/sdk-client';
import { ActiveNumberApi, AvailableNumberApi, AvailableRegionsApi, CallbacksApi, NumbersService } from '../../../src';

describe('Numbers Service', () => {
  const DEFAULT_HOSTNAME = 'https://numbers.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';

  it('should initialize all the APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const numbersService = new NumbersService(params);

    // Then
    expect(numbersService.availableRegions).toBeInstanceOf(AvailableRegionsApi);
    expect(numbersService.availableNumber).toBeInstanceOf(AvailableNumberApi);
    expect(numbersService.activeNumber).toBeInstanceOf(ActiveNumberApi);
    expect(numbersService.callbacks).toBeInstanceOf(CallbacksApi);
    expect(numbersService.availableRegions.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(numbersService.availableNumber.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(numbersService.activeNumber.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(numbersService.callbacks.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
  });

  it('should set a custom hostname for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const numbersService = new NumbersService(params);
    numbersService.setHostname(CUSTOM_HOSTNAME);

    // Then
    expect(numbersService.availableRegions.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(numbersService.availableNumber.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(numbersService.activeNumber.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(numbersService.callbacks.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(numbersService.availableRegions.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(numbersService.availableNumber.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(numbersService.activeNumber.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(numbersService.callbacks.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should set new credentials for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const numbersService = new NumbersService(params);
    numbersService.setCredentials({
      projectId: 'NEW_PROJECT_ID',
    });

    // Then
    expect(numbersService.availableRegions.getSinchClient().apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.availableNumber.getSinchClient().apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.activeNumber.getSinchClient().apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.callbacks.getSinchClient().apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.availableRegions.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.availableNumber.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.activeNumber.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.callbacks.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const numbersService = new NumbersService(params);
    expect(() => numbersService.setCredentials({ projectId: '' }))
      .toThrow('Invalid configuration for the Numbers API: "projectId", "keyId" and "keySecret"'
        + ' values must be provided');

    // Then
    expect(numbersService.availableRegions.getSinchClient().apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numbersService.availableNumber.getSinchClient().apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numbersService.activeNumber.getSinchClient().apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numbersService.callbacks.getSinchClient().apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numbersService.availableRegions.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numbersService.availableNumber.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numbersService.activeNumber.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numbersService.callbacks.client.apiClientOptions.projectId).toBe('PROJECT_ID');
  });
});
