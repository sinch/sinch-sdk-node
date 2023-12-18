import {
  InboundMessageResponse,
} from '../../../models';
import {
  RequestBody,
  ApiListPromise,
  PaginatedApiProperties,
  PaginationEnum,
  SinchClientParameters,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
} from '@sinch/sdk-client';
import { SmsApi } from '../sms-api';

export interface ListInboundMessagesRequestData {
  /** The page number starting from 0. */
  'page'?: number;
  /** Determines the size of a page */
  'page_size'?: number;
  /** Only list messages sent to this destination. Multiple phone numbers formatted as either <a href=\"https://community.sinch.com/t5/Glossary/E-164/ta-p/7537\" target=\"_blank\">E.164</a> or short codes can be comma separated. */
  'to'?: string;
  /** Only list messages received at or after this date/time. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601): `YYYY-MM-DDThh:mm:ss.SSSZ`.  Default: Now-24 */
  'start_date'?: Date;
  /** Only list messages received before this date/time. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601): `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  'end_date'?: Date;
  /** Using a client reference in inbound messages requires additional setup on your account. Contact your <a href=\"https://dashboard.sinch.com/settings/account-details\" target=\"_blank\">account manager</a> to enable this feature.  Only list inbound messages that are in response to messages with a previously provided client reference. */
  'client_reference'?: string;
}
export interface GetInboundMessageRequestData {
  /** The inbound ID found when listing inbound messages. */
  'inbound_id': string;
}

export class InboundsApi extends SmsApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'InboundsApi');
  }

  /**
   * List incoming messages
   * With the list operation, you can list all inbound messages that you have received. This operation supports pagination. Inbounds are returned in reverse chronological order.
   * @param { ListInboundMessagesRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<InboundMessageResponse>}
   */
  public list(data: ListInboundMessagesRequestData): ApiListPromise<InboundMessageResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListInboundMessagesRequestData>(
      data,
      ['page', 'page_size', 'to', 'start_date', 'end_date', 'client_reference'],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/xms/v1/${this.client.apiClientOptions.projectId}/inbounds`;

    const requestOptionsPromise = this.client.prepareOptions(
      basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE,
      apiName: this.apiName,
      operationId: 'ListInboundMessages',
      dataKey: 'inbounds',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<InboundMessageResponse>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<InboundMessageResponse>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<InboundMessageResponse>;
  }

  /**
   * Retrieve inbound message
   * This operation retrieves a specific inbound message with the provided inbound ID.
   * @param { GetInboundMessageRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetInboundMessageRequestData): Promise<InboundMessageResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetInboundMessageRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/xms/v1/${this.client.apiClientOptions.projectId}/inbounds/${data['inbound_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<InboundMessageResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'RetrieveInboundMessage',
    });
  }

}
