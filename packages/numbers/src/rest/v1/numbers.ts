/**
 * Domain: numbers
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */
import { SinchClientParameters } from '@sinch/sdk-client';
import { AvailableRegionsApi } from './available-regions';
import { CallbackConfigurationApi } from './callback-configuration';
import { AvailableNumberApi } from './available-number';
import { ActiveNumberApi } from './active-number';

export class Numbers {
  public readonly availableRegions: AvailableRegionsApi;
  public readonly callbackConfiguration: CallbackConfigurationApi;
  public readonly availableNumber: AvailableNumberApi;
  public readonly activeNumber: ActiveNumberApi;

  constructor(params: SinchClientParameters) {
    this.availableRegions = new AvailableRegionsApi(params);
    this.callbackConfiguration = new CallbackConfigurationApi(params);
    this.availableNumber = new AvailableNumberApi(params);
    this.activeNumber = new ActiveNumberApi(params);
  }

  /**
   * Update the default basePath for each API
   *
   * @param {string} basePath - The new base path to use for all the APIs.
   */
  public setBasePath(basePath: string) {
    this.activeNumber.setBasePath(basePath);
    this.availableNumber.setBasePath(basePath);
    this.availableRegions.setBasePath(basePath);
    this.callbackConfiguration.setBasePath(basePath);
  }
}
