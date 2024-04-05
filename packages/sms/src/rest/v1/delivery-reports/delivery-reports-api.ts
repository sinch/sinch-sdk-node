import {
  DeliveryReport,
  DeliveryReportStatusEnum,
  RecipientDeliveryReport,
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
import { SmsDomainApi } from '../sms-domain-api';

export interface GetDeliveryReportByBatchIdRequestData {
  /** The batch ID you received from sending a message. */
  'batch_id': string;
  /** The type of delivery report.  - A `summary` will count the number of messages sent per status.  - A `full` report give that of a `summary` report but in addition, lists phone numbers. */
  'type'?: 'summary' | 'full';
  /** Comma separated list of delivery_report_statuses to include */
  'status'?: DeliveryReportStatusEnum[];
  /** Comma separated list of delivery_receipt_error_codes to include */
  'code'?: string;
}
export interface GetDeliveryReportByPhoneNumberRequestData {
  /** The batch ID you received from sending a message. */
  'batch_id': string;
  /** Phone number for which you to want to search. */
  'recipient_msisdn': string;
}
export interface ListDeliveryReportsRequestData {
  /** The page number starting from 0. */
  'page'?: number;
  /** Determines the size of a page. */
  'page_size'?: number;
  /** Only list messages received at or after this date/time. Default: 24h ago */
  'start_date'?: Date;
  /** Only list messages received before this date/time. */
  'end_date'?: Date;
  /** Comma separated list of delivery report statuses to include. */
  'status'?: DeliveryReportStatusEnum[];
  /** Comma separated list of delivery receipt error codes to include. */
  'code'?: string;
  /** Client reference to include */
  'client_reference'?: string;
}

export class DeliveryReportsApi extends SmsDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'DeliveryReportsApi');
  }

  /**
   * Retrieve a delivery report
   * Delivery reports can be retrieved even if no callback was requested. The difference between a summary and a full report is only that the full report contains the phone numbers in &lt;a href&#x3D;\&quot;https://community.sinch.com/t5/Glossary/E-164/ta-p/7537\&quot; target&#x3D;\&quot;_blank\&quot;&gt;E.164&lt;/a&gt; format for each status code.
   * @param { GetDeliveryReportByBatchIdRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetDeliveryReportByBatchIdRequestData): Promise<DeliveryReport> {
    this.client = this.getSinchClient();
    data['type'] = data['type'] !== undefined ? data['type'] : 'summary';
    const getParams = this.client.extractQueryParams<GetDeliveryReportByBatchIdRequestData>(
      data,
      ['type', 'status', 'code'],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/xms/v1/${this.client.apiClientOptions.projectId}/batches/${data['batch_id']}/delivery_report`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<DeliveryReport>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetDeliveryReportByBatchId',
    });
  }

  /**
   * Retrieve a recipient delivery report
   * A recipient delivery report contains the message status for a single recipient phone number.
   * @param { GetDeliveryReportByPhoneNumberRequestData } data - The data to provide to the API call.
   */
  public async getForNumber(data: GetDeliveryReportByPhoneNumberRequestData): Promise<RecipientDeliveryReport> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetDeliveryReportByPhoneNumberRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/xms/v1/${this.client.apiClientOptions.projectId}/batches/${data['batch_id']}/delivery_report/${data['recipient_msisdn']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<RecipientDeliveryReport>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetDeliveryReportByPhoneNumber',
    });
  }

  /**
   * Retrieve a list of delivery reports
   * Get a list of finished delivery reports.  This operation supports pagination.
   * @param { ListDeliveryReportsRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<RecipientDeliveryReport>}
   */
  public list(data: ListDeliveryReportsRequestData): ApiListPromise<RecipientDeliveryReport> {
    this.client = this.getSinchClient();
    data['page'] = data['page'] !== undefined ? data['page'] : 0;
    data['page_size'] = data['page_size'] !== undefined ? data['page_size'] : 30;
    const getParams = this.client.extractQueryParams<ListDeliveryReportsRequestData>(
      data,
      ['page', 'page_size', 'start_date', 'end_date', 'status', 'code', 'client_reference'],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/xms/v1/${this.client.apiClientOptions.projectId}/delivery_reports`;

    const requestOptionsPromise
      = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE,
      apiName: this.apiName,
      operationId: 'GetDeliveryReports',
      dataKey: 'delivery_reports',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<RecipientDeliveryReport>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<RecipientDeliveryReport>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<RecipientDeliveryReport>;
  }

}
