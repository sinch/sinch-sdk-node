import { SinchClientParameters } from '@sinch/sdk-client';
import { AvailableRegionsApi } from './available-regions';
import { CallbacksApi } from './callbacks';
import { AvailableNumberApi } from './available-number';
import { ActiveNumberApi } from './active-number';

export class NumbersService {
  public readonly availableRegions: AvailableRegionsApi;
  public readonly callbacks: CallbacksApi;
  public readonly availableNumber: AvailableNumberApi;
  public readonly activeNumber: ActiveNumberApi;

  constructor(params: SinchClientParameters) {
    this.availableRegions = new AvailableRegionsApi(params);
    this.callbacks = new CallbacksApi(params);
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
    this.callbacks.setBasePath(basePath);
  }
}
