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
  });
});
