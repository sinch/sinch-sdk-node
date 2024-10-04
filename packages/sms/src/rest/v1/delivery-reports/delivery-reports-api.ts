import {
  DeliveryReport,
  GetDeliveryReportByBatchIdRequestData,
  GetDeliveryReportByPhoneNumberRequestData,
  ListDeliveryReportsRequestData,
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

    // TODO: Remove in v2.0
    let phoneNumber;
    if (data['phone_number']) {
      phoneNumber = data['phone_number'];
    }
    else if (data['recipient_msisdn']) {
      phoneNumber = data['recipient_msisdn'];
    }

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/xms/v1/${this.client.apiClientOptions.projectId}/batches/${data['batch_id']}/delivery_report/${phoneNumber}`;

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
