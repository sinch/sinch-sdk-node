import { SinchClientParameters } from '@sinch/sdk-client';
import { AvailableRegionsApi } from './available-regions';
import { CallbacksApi } from './callbacks';
import { AvailableNumberApi } from './available-number';
import { ActiveNumberApi } from './active-number';

/**
 * The Numbers Service exposes the following APIs:
 *  - availableRegions
 *  - availableNumber
 *  - activeNumber
 *  - callbacks
 */
export class NumbersService {
  public readonly availableRegions: AvailableRegionsApi;
  public readonly callbacks: CallbacksApi;
  public readonly availableNumber: AvailableNumberApi;
  public readonly activeNumber: ActiveNumberApi;

  /**
   * Create a new NumbersService instance with its configuration. It needs the following parameters for authentication:
   *  - `projectId`
   *  - `keyId`
   *  - `keySecret`
   *
   * Other supported properties:
   *  - `numbersHostname`
   * @param {SinchClientParameters} params - an Object containing the necessary properties to initialize the service
   */
  constructor(params: SinchClientParameters) {
    this.availableRegions = new AvailableRegionsApi(params);
    this.callbacks = new CallbacksApi(params);
    this.availableNumber = new AvailableNumberApi(params);
    this.activeNumber = new ActiveNumberApi(params);
  }

  /**
   * Update the default hostname for each API
   *
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.activeNumber.setHostname(hostname);
    this.availableNumber.setHostname(hostname);
    this.availableRegions.setHostname(hostname);
    this.callbacks.setHostname(hostname);
  }
}
