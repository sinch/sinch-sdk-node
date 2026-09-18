import { RequestBody } from '@sinch/sdk-client';
import {
  DescribeSvamlRequestData,
  SvamlDescriptionResponse,
  ValidateSvamlRequestData,
  ValidateSvamlResponse,
} from '../../../models/v2';
import { VoiceV2DomainApi } from '../voice-v2-domain-api';
import { LazyVoiceV2ApiClient } from '../voice-v2-service';

export class SvamlApi extends VoiceV2DomainApi {

  /** @internal */
  constructor(lazyClient: LazyVoiceV2ApiClient) {
    super(lazyClient, 'SvamlApi');
  }

  /**
   * Describe the call flow from the SVAML payload
   * Understand the structure and flow of a SVAML payload without executing it. Provides a
   * detailed description of the commands, events, and messages defined in the SVAML.
   * @param { DescribeSvamlRequestData } data - The data to provide to the API call.
   */
  public async describe(data: DescribeSvamlRequestData): Promise<SvamlDescriptionResponse> {
    const getParams = this.client.extractQueryParams<DescribeSvamlRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['describeSvamlRequestBody']
      ? JSON.stringify(data['describeSvamlRequestBody'])
      : '{}';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/svaml/describe`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<SvamlDescriptionResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'describeSvaml',
    });
  }

  /**
   * Validate a SVAML payload
   * Check the structure and content of the SVAML commands to ensure they conform to the expected
   * schema and rules. Use `validationType` to choose `NORMAL` (same rules as initiating a call)
   * or `STRICT` (errors for unrecognised properties).
   * @param { ValidateSvamlRequestData } data - The data to provide to the API call.
   */
  public async validate(data: ValidateSvamlRequestData): Promise<ValidateSvamlResponse> {
    const getParams = this.client.extractQueryParams<ValidateSvamlRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['validateSvamlRequestBody']
      ? JSON.stringify(data['validateSvamlRequestBody'])
      : '{}';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/svaml/validate`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ValidateSvamlResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'validateSvaml',
    });
  }

}
