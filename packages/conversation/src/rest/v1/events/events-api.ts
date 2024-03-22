import {
  ApiListPromise,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
  PaginatedApiProperties,
  PaginationEnum,
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import {
  Conversation,
  ConversationEvent,
  Recipient,
  SendAgentJoinedEventRequest,
  SendAgentLeftEventRequest,
  SendCommentReplyEventRequest,
  SendComposingEndEventRequest,
  SendComposingEventRequest,
  SendEventRequest,
  SendEventResponse,
  SendGenericEventRequest,
} from '../../../models';
import { ConversationDomainApi } from '../conversation-domain-api';

export interface DeleteEventRequestData {
  /** The unique ID of the event. */
  'event_id': string;
}
export interface GetEventRequestData {
  /** The unique ID of the event. */
  'event_id': string;
}
export interface ListEventsRequestData {
  /** Resource name (id) of the conversation. One of conversation_id or contact_id needs to be present. */
  'conversation_id'?: string;
  /** Resource name (id) of the contact. One of conversation_id or contact_id needs to be present. */
  'contact_id'?: string;
  /** Maximum number of events to fetch. Defaults to 10 and the maximum is 20. */
  'page_size'?: number;
  /** Next page token previously returned if any. When specifying this token, make sure to use the same values for the other parameters from the request that originated the token, otherwise the paged results may be inconsistent. */
  'page_token'?: string;
}
export interface SendEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendEventRequest<T>;
}
export interface SendComposingEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendComposingEventRequest<T>;
}
export interface SendComposingEndEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendComposingEndEventRequest<T>;
}
export interface SendCommentReplyEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendCommentReplyEventRequest<T>;
}
export interface SendAgentJoinedEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendAgentJoinedEventRequest<T>;
}
export interface SendAgentLeftEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendAgentLeftEventRequest<T>;
}
export interface SendGenericEventRequestData<T extends Recipient> {
  /** The event to be sent. */
  'sendEventRequestBody': SendGenericEventRequest<T>;
}

export class EventsApi extends ConversationDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'EventsApi');
  }

  /**
   * Delete an event
   * Delete a specific event by its ID.
   * @param { DeleteEventRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteEventRequestData): Promise<any> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteEventRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/events/${data['event_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<any>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteEvents',
    });
  }

  /**
   * Get an event
   * Get event from ID
   * @param { GetEventRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetEventRequestData): Promise<ConversationEvent> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetEventRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/events/${data['event_id']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<ConversationEvent>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetEvent',
    });
  }

  /**
   * List events
   * List all events in a project
   * @param { ListEventsRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<ConversationEvent>}
   */
  public list(data: ListEventsRequestData): ApiListPromise<ConversationEvent> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListEventsRequestData>(data, [
      'conversation_id',
      'contact_id',
      'page_size',
      'page_token',
    ]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/events`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.TOKEN,
      apiName: this.apiName,
      operationId: 'ListEvents',
      dataKey: 'events',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<Conversation>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<Conversation>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<ConversationEvent>;
  }

  /**
   * Send an event
   * Sends an event to the referenced contact from the referenced app. Note that this operation enqueues the event in a queue so a successful response only indicates that the event has been queued.
   * @param { SendEventRequestData<Recipient> } data - The data to provide to the API call.
   */
  public async send(data: SendEventRequestData<Recipient>): Promise<SendEventResponse> {
    return this.sendEvent(data, 'SendEvent');
  }

  /**
   * Send a composing event
   * Sends an event to the referenced contact from the referenced app. Note that this operation enqueues the event in a queue so a successful response only indicates that the event has been queued.
   * @param { SendComposingEventRequestData<Recipient> } data - The data to provide to the API call.
   */
  public async sendComposingEvent(data: SendComposingEventRequestData<Recipient>): Promise<SendEventResponse> {
    return this.sendEvent(data, 'SendComposingEvent');
  }

  /**
   * Send a composing end event
   * Sends an event to the referenced contact from the referenced app. Note that this operation enqueues the event in a queue so a successful response only indicates that the event has been queued.
   * @param { SendComposingEndEventRequestData<Recipient> } data - The data to provide to the API call.
   */
  public async sendComposingEndEvent(data: SendComposingEndEventRequestData<Recipient>): Promise<SendEventResponse> {
    return this.sendEvent(data, 'SendComposingEndEvent');
  }

  /**
   * Send a composing reply event
   * Sends an event to the referenced contact from the referenced app. Note that this operation enqueues the event in a queue so a successful response only indicates that the event has been queued.
   * @param {SendCommentReplyEventRequestData<Recipient>} data - The data to provide to the API call.
   */
  public async sendCommentReplyEvent(data: SendCommentReplyEventRequestData<Recipient>): Promise<SendEventResponse> {
    return this.sendEvent(data, 'SendCommentReplyEvent');
  }

  /**
   * Send an agent joined event
   * Sends an event to the referenced contact from the referenced app. Note that this operation enqueues the event in a queue so a successful response only indicates that the event has been queued.
   * @param {SendAgentJoinedEventRequestData} data - The data to provide to the API call.
   */
  public async sendAgentJoinedEvent(data: SendAgentJoinedEventRequestData<Recipient>): Promise<SendEventResponse> {
    return this.sendEvent(data, 'SendAgentJoinedEvent');
  }

  /**
   * Send an agent left event
   * Sends an event to the referenced contact from the referenced app. Note that this operation enqueues the event in a queue so a successful response only indicates that the event has been queued.
   * @param {SendAgentLeftEventRequestData<Recipient>} data - The data to provide to the API call.
   */
  public async sendAgentLeftEvent(data: SendAgentLeftEventRequestData<Recipient>): Promise<SendEventResponse> {
    return this.sendEvent(data, 'SendAgentLeftEvent');
  }

  /**
   * Send a generic event
   * Sends an event to the referenced contact from the referenced app. Note that this operation enqueues the event in a queue so a successful response only indicates that the event has been queued.
   * @param {SendGenericEventRequestData<Recipient>} data - The data to provide to the API call.
   */
  public async sendGenericEvent(data: SendGenericEventRequestData<Recipient>): Promise<SendEventResponse> {
    return this.sendEvent(data, 'SendGenericEvent');
  }

  private async sendEvent(
    data: SendEventRequestData<Recipient>,
    operationId: string,
  ): Promise<SendEventResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<SendEventRequestData<Recipient>>(
      data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['sendEventRequestBody']
      ? JSON.stringify(data['sendEventRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/events:send`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<SendEventResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId,
    });
  }

}
