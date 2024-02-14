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
  Contact,
  ContactCreateRequest,
  ConversationChannel,
  GetChannelProfileRequest,
  GetChannelProfileResponse,
  MergeContactRequest,
} from '../../../models';
import { ConversationDomainApi } from '../conversation-domain-api';

export interface CreateContactRequestData {
  /** The contact to create. */
  'contactCreateRequestBody': ContactCreateRequest;
}
export interface DeleteContactRequestData {
  /** The unique ID of the contact. */
  'contact_id': string;
}
export interface GetChannelProfileRequestData {
  /**  */
  'getChannelProfileRequestBody': GetChannelProfileRequest;
}
export interface GetContactRequestData {
  /** The unique ID of the contact. */
  'contact_id': string;
}
export interface ListContactsRequestData {
  /** Optional. The maximum number of contacts to fetch. The default is 10 and the maximum is 20. */
  'page_size'?: number;
  /** Optional. Next page token previously returned if any. */
  'page_token'?: string;
  /** Optional. Contact identifier in an external system. If used, `channel` and `identity` query parameters can\'t be used. */
  'external_id'?: string;
  /** Optional. Specifies a channel, and must be set to one of the enum values. If set, the `identity` parameter must be set and `external_id` can\'t be used. Used in conjunction with `identity` to uniquely identify the specified channel identity. */
  'channel'?: ConversationChannel;
  /** Optional. If set, the `channel` parameter must be set and `external_id` can\'t be used. Used in conjunction with `channel` to uniquely identify the specified channel identity. This will differ from channel to channel. For example, a phone number for SMS, WhatsApp, and Viber Business. */
  'identity'?: string;
}
export interface MergeContactRequestData {
  /** The unique ID of the contact that should be kept when merging two contacts. */
  'destination_id': string;
  /** The contact to be removed. */
  'mergeContactRequestBody': MergeContactRequest;
}
export interface UpdateContactRequestData {
  /** The unique ID of the contact. */
  'contact_id': string;
  /** The updated contact. */
  'updateContactRequestBody': Contact;
  /** The set of field mask paths. */
  'update_mask'?: Array<string>;
}

export class ContactApi extends ConversationDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'ContactApi');
  }

  /**
   * Create a Contact
   * Most Conversation API contacts are [created automatically](/docs/conversation/contact-management/) when a message is sent to a new recipient. You can also create a new contact manually using this API call.
   * @param { CreateContactRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateContactRequestData): Promise<Contact> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<CreateContactRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['contactCreateRequestBody'] ? JSON.stringify(data['contactCreateRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/contacts`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<Contact>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CreateContact',
    });
  }

  /**
   * Delete a Contact
   * Delete a contact as specified by the contact ID.
   * @param { DeleteContactRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteContactRequestData): Promise<any> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteContactRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/contacts/${data['contact_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<any>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteContact',
    });
  }

  /**
   * Get Channel Profile
   * Get user profile from a specific channel. Only supported on &#x60;MESSENGER&#x60;, &#x60;INSTAGRAM&#x60;, &#x60;VIBER&#x60; and &#x60;LINE&#x60; channels. Note that, in order to retrieve a WhatsApp display name, you can use the Get a Contact or List Contacts operations, which will populate the &#x60;display_name&#x60; field of each returned contact with the WhatsApp display name (if the name is already stored on the server and the &#x60;display_name&#x60; field has not been overwritten by the user).
   * @param { GetChannelProfileRequestData } data - The data to provide to the API call.
   */
  public async getChannelProfile(data: GetChannelProfileRequestData): Promise<GetChannelProfileResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetChannelProfileRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['getChannelProfileRequestBody'] ? JSON.stringify(data['getChannelProfileRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/contacts:getChannelProfile`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<GetChannelProfileResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetChannelProfile',
    });
  }

  /**
   * Get a Contact
   * Returns a specific contact as specified by the contact ID. Note that, if a WhatsApp contact is returned, the &#x60;display_name&#x60; field of that contact may be populated with the WhatsApp display name (if the name is already stored on the server and the &#x60;display_name&#x60; field has not been overwritten by the user).
   * @param { GetContactRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetContactRequestData): Promise<Contact> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetContactRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/contacts/${data['contact_id']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<Contact>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetContact',
    });
  }

  /**
   * List Contacts
   * List all contacts in the project. Note that, if a WhatsApp contact is returned, the &#x60;display_name&#x60; field of that contact may be populated with the WhatsApp display name (if the name is already stored on the server and the &#x60;display_name&#x60; field has not been overwritten by the user).
   * @param { ListContactsRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<Contact>}
   */
  public list(data: ListContactsRequestData): ApiListPromise<Contact> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListContactsRequestData>(
      data,
      ['page_size', 'page_token', 'external_id', 'channel', 'identity']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/contacts`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.TOKEN,
      apiName: this.apiName,
      operationId: 'ListContacts',
      dataKey: 'contacts',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<Contact>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<Contact>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<Contact>;
  }

  /**
   * Merge two Contacts
   * The remaining contact will contain all conversations that the removed contact did. If both contacts had conversations within the same App, messages from the removed contact will be merged into corresponding active conversations in the destination contact. Channel identities will be moved from the source contact to the destination contact only for channels that weren\&#39;t present there before. Moved channel identities will be placed at the bottom of the channel priority list. Optional fields from the source contact will be copied only if corresponding fields in the destination contact are empty The contact being removed cannot be referenced after this call.
   * @param { MergeContactRequestData } data - The data to provide to the API call.
   */
  public async mergeContact(data: MergeContactRequestData): Promise<Contact> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<MergeContactRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['mergeContactRequestBody'] ? JSON.stringify(data['mergeContactRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/contacts/${data['destination_id']}:merge`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<Contact>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'MergeContact',
    });
  }

  /**
   * Update a Contact
   * Updates a contact as specified by the contact ID.
   * @param { UpdateContactRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateContactRequestData): Promise<Contact> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateContactRequestData>(data, ['update_mask']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateContactRequestBody']
      ? JSON.stringify(data['updateContactRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/contacts/${data['contact_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PATCH', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<Contact>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateContact',
    });
  }

}
