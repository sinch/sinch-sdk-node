import { randomUUID } from 'crypto';
import {
  ApiListPromise,
  PaginatedApiProperties,
  PaginationEnum,
  RequestBody,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
} from '@sinch/sdk-client';
import {
  Call,
  CallResponse,
  CreateCallRequestData,
  GetCallByIdRequestData,
  ListCallsRequestData,
  PatchCallByIdRequestData,
  PatchCallBySessionAndNameRequestData,
} from '../../../models/v2';
import { VoiceV2DomainApi } from '../voice-v2-domain-api';
import { LazyVoiceV2ApiClient } from '../voice-v2-service';

export class CallsApi extends VoiceV2DomainApi {

  /** @internal */
  constructor(lazyClient: LazyVoiceV2ApiClient) {
    super(lazyClient, 'CallsApi');
  }

  /**
   * Create and initiate an outbound voice call
   * Create a new outbound call associated to the project's default service or to the service
   * specified in the `serviceId` query parameter. For a batch of outbound call sessions, use
   * `voice.v2.batches.start` instead.
   * @param { CreateCallRequestData } data - The data to provide to the API call.
   */
  public async start(data: CreateCallRequestData): Promise<CallResponse> {
    const getParams = this.client.extractQueryParams<CreateCallRequestData>(data, ['serviceId']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Idempotency-Key': data['Idempotency-Key'] ?? randomUUID(),
    };

    const body: RequestBody = data['createCallRequestBody']
      ? JSON.stringify(data['createCallRequestBody'])
      : '{}';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/calls`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CallResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'createCall',
    });
  }

  /**
   * List calls made with Sinch Voice API
   * List and filter calls made with Sinch
   * @param { ListCallsRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<Call>}
   */
  public list(data?: ListCallsRequestData): ApiListPromise<Call> {
    const getParams = this.client.extractQueryParams<ListCallsRequestData>(
      data ?? {},
      [
        'serviceId',
        'from',
        'to',
        'callType',
        'startTime',
        'endTime',
        'callResult',
        'callReason',
        'pageSize',
        'page',
      ],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/calls`;

    const requestOptionsPromise
      = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE_LINK,
      apiName: this.apiName,
      operationId: 'listCalls',
      dataKey: 'calls',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<Call>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<Call>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<Call>;
  }

  /**
   * Retrieve call details by call ID
   * Retrieve detailed information about a specific call using its unique identifier.
   * @param { GetCallByIdRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetCallByIdRequestData): Promise<Call> {
    const getParams = this.client.extractQueryParams<GetCallByIdRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/calls/${data['callId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<Call>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'getCallById',
    });
  }

  /**
   * Patch an ongoing call by call ID
   * Interact with an ongoing call by submitting a set of SVAML commands.
   * Use this to force disconnect, play messages, bridge with another call, or perform other call control actions.
   * @param { PatchCallByIdRequestData } data - The data to provide to the API call.
   */
  public async interactByCallId(data: PatchCallByIdRequestData): Promise<void> {
    const getParams = this.client.extractQueryParams<PatchCallByIdRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Idempotency-Key': data['Idempotency-Key'] ?? randomUUID(),
    };

    const body: RequestBody = data['callPatchRequestBody']
      ? JSON.stringify(data['callPatchRequestBody'])
      : '{}';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/calls/${data['callId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PATCH', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'patchCallById',
    });
  }

  /**
   * Patch an ongoing call by session ID and call name
   * Interact with an ongoing call identified by its session and call name by submitting a set of SVAML commands.
   * Use this to force disconnect, play messages, bridge with another call, or perform other call control actions.
   * @param { PatchCallBySessionAndNameRequestData } data - The data to provide to the API call.
   */
  public async interactByCallName(data: PatchCallBySessionAndNameRequestData): Promise<void> {
    const getParams = this.client.extractQueryParams<PatchCallBySessionAndNameRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Idempotency-Key': data['Idempotency-Key'] ?? randomUUID(),
    };

    const body: RequestBody = data['callPatchRequestBody']
      ? JSON.stringify(data['callPatchRequestBody'])
      : '{}';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/sessions/${data['sessionId']}/calls/${data['callName']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PATCH', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'patchCallBySessionAndName',
    });
  }

}
