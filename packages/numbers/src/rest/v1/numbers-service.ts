import {
  ApiFetchClient,
  ApiListPromise,
  buildOAuth2ApiClientOptions,
  NUMBERS_HOSTNAME,
  SinchClientParameters,
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { AvailableRegionsApi } from './available-regions';
import { CallbacksApi } from './callbacks';
import { AvailableNumberApi } from './available-number';
import { ActiveNumberApi } from './active-number';
import {
  ActiveNumber,
  AvailableNumber,
  AvailableNumbersResponse,
  DeprovisionEmergencyAddressRequestData,
  EmergencyAddress,
  GetActiveNumberRequestData,
  GetAvailableNumberRequestData,
  GetEmergencyAddressRequestData,
  ListActiveNumbersRequestData,
  ListAvailableNumbersRequestData,
  ProvisionEmergencyAddressRequestData,
  ReleaseNumberRequestData,
  RentAnyNumberRequestData,
  RentNumberRequestData,
  UpdateActiveNumberRequestData,
  ValidateEmergencyAddressResponse,
  ValidateEmergencyAddressRequestData,
} from '../../models';

export class LazyNumbersApiClient {
  private apiFetchClient?: ApiFetchClient;
  constructor(public sharedConfig: SinchClientParameters) {}

  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const apiClientOptions = buildOAuth2ApiClientOptions(this.sharedConfig, 'Numbers');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      this.apiFetchClient.apiClientOptions.hostname = this.sharedConfig.numbersHostname ?? NUMBERS_HOSTNAME;
    }
    return this.apiFetchClient;
  }

  public resetApiClient() {
    this.apiFetchClient = undefined;
  }
}

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
  /** @deprecated Use the methods exposed at the Numbers Service level instead */
  public readonly availableNumber: AvailableNumberApi;
  /** @deprecated Use the methods exposed at the Numbers Service level instead */
  public readonly activeNumber: ActiveNumberApi;

  private readonly lazyClient: LazyNumbersApiClient;

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
    const sharedClient = new LazyNumbersApiClient(params);
    this.lazyClient = sharedClient;

    this.availableRegions = new AvailableRegionsApi(sharedClient);
    this.callbacks = new CallbacksApi(sharedClient);
    this.availableNumber = new AvailableNumberApi(sharedClient);
    this.activeNumber = new ActiveNumberApi(sharedClient);
  }

  public setApiClientConfig(newParams: SinchClientParameters) {
    this.lazyClient.sharedConfig = newParams;
    this.lazyClient.resetApiClient();
  }

  /**
   * Update the default hostname for each API
   *
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string): void {
    this.lazyClient.sharedConfig.numbersHostname = hostname;
    this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
  }

  public setCredentials(credentials: Partial<UnifiedCredentials>): void {
    const parametersBackup = { ...this.lazyClient.sharedConfig };
    this.lazyClient.sharedConfig = {
      ...parametersBackup,
      ...credentials,
    };
    this.lazyClient.resetApiClient();
    try {
      this.lazyClient.getApiClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the Numbers API');
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }

  /**
   * This endpoint allows you to enter a specific phone number to check if it's available for use.
   * A 200 response will return the number's capability, setup costs, monthly costs and if supporting documentation is required.
   * If the phone number is not available, the API will return a 404 error.
   * @param {GetAvailableNumberRequestData} data - The data to provide to the API call.
   */
  public async checkAvailability(data: GetAvailableNumberRequestData): Promise<AvailableNumber> {
    return this.availableNumber.checkAvailability(data);
  }

  /**
   * Search for virtual numbers that are available for you to activate. You can filter by any property on the available number resource.
   * @param {ListAvailableNumbersRequestData} data - The data to provide to the API call.
   */
  public async searchForAvailableNumbers(data: ListAvailableNumbersRequestData): Promise<AvailableNumbersResponse> {
    return this.availableNumber.list(data);
  }

  /**
   * Rent any virtual number that matches the criteria (Search for and activate an available Sinch virtual number all in one API call).
   * @param {RentAnyNumberRequestData} data - The data to provide to the API call.
   */
  public async rentAny(data: RentAnyNumberRequestData): Promise<ActiveNumber> {
    return this.availableNumber.rentAny(data);
  }

  /**
   * Rent a virtual number to use with SMS products, Voice products, or both. You'll use 'smsConfiguration' to set up your number for SMS and 'voiceConfiguration' for Voice.
   * @param {RentNumberRequestData} data - The data to provide to the API call.
   */
  public async rent(data: RentNumberRequestData): Promise<ActiveNumber> {
    return this.availableNumber.rent(data);
  }

  /**
   * Retrieve a virtual number's details
   * @param {GetActiveNumberRequestData} data - The data to provide to the API call.
   */
  public async get(data: GetActiveNumberRequestData): Promise<ActiveNumber> {
    return this.activeNumber.get(data);
  }

  /**
   * Lists all virtual numbers for a project.
   * @param {ListActiveNumbersRequestData} data - The data to provide to the API call.
   * @return {ApiListPromise<ActiveNumber>}
   */
  public list(data: ListActiveNumbersRequestData): ApiListPromise<ActiveNumber> {
    return this.activeNumber.list(data);
  }

  /**
   * Release number.
   * With this endpoint, you can cancel your subscription for a specific virtual phone number.
   * @param {ReleaseNumberRequestData} data - The data to provide to the API call.
   */
  public async release(data: ReleaseNumberRequestData): Promise<ActiveNumber> {
    return this.activeNumber.release(data);
  }

  /**
   * Update a virtual phone number. For example: you can configure SMS/Voice services or set a friendly name. To update the name that displays, modify the `displayName` parameter.
   * You'll use `smsConfiguration` to update your SMS configuration and `voiceConfiguration` to update the voice configuration.
   * @param {UpdateActiveNumberRequestData} data - The data to provide to the API call.
   */
  public async update(data: UpdateActiveNumberRequestData): Promise<ActiveNumber> {
    return this.activeNumber.update(data);
  }

  /**
   * Remove the emergency address for a number.
   * With this endpoint, you can deprovision the emergency address associated with this number.
   * @param {DeprovisionEmergencyAddressRequestData} data - The data to provide to the API call.
   */
  public async deprovisionEmergencyAddress(data: DeprovisionEmergencyAddressRequestData): Promise<void> {
    return this.activeNumber.deprovisionEmergencyAddress(data);
  }

  /**
   * Get the emergency address for a number
   * With this endpoint, you can retrieve the emergency address associated with this number.
   * @param {GetEmergencyAddressRequestData} data - The data to provide to the API call.
   */
  public async getEmergencyAddress(data: GetEmergencyAddressRequestData): Promise<EmergencyAddress> {
    return this.activeNumber.getEmergencyAddress(data);
  }

  /**
   * Add a emergency address for a number
   * With this endpoint, you can provision an emergency address associated with this number.
   * @param {ProvisionEmergencyAddressRequestData} data - The data to provide to the API call.
   */
  public async provisionEmergencyAddress(data: ProvisionEmergencyAddressRequestData): Promise<EmergencyAddress> {
    return this.activeNumber.provisionEmergencyAddress(data);
  }

  /**
   * Validate the emergency address for a number.
   * With this endpoint, you can validate the emergency address associated with this number.
   * @param {ValidateEmergencyAddressRequestData} data - The data to provide to the API call.
   */
  public async validateEmergencyAddress(
    data: ValidateEmergencyAddressRequestData,
  ): Promise<ValidateEmergencyAddressResponse> {
    return this.activeNumber.validateEmergencyAddress(data);
  }
}
