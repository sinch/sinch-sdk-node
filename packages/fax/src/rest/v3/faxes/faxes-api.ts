import {
  ApiListPromise,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
  DateFormat,
  FileBuffer,
  formatDate,
  PaginatedApiProperties,
  PaginationEnum,
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { FaxDomainApi } from '../fax-domain-api';
import {
  Fax,
  FaxRequestJson,
  DeleteFaxContentRequestData,
  DownloadFaxContentRequestData,
  GetFaxRequestData,
  ListFaxesRequestData,
  SendSingleFaxRequestData,
  SingleFaxRequestFormData,
  FaxesList,
  SendMultipleFaxRequestData,
  MultipleFaxRequestFormData,
  SendFaxRequestData,
} from '../../../models';
import FormData = require('form-data');
import * as fs from 'fs';

export class FaxesApi extends FaxDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'FaxesApi');
  }

  /**
   * Delete fax content
   * Delete the fax content for a fax using the ID number of the fax. Please note that this only deletes the content of the fax from storage.
   * @param { DeleteFaxContentRequestData } data - The data to provide to the API call.
   */
  public async deleteContent(data: DeleteFaxContentRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteFaxContentRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/faxes/${data['id']}/file`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteFaxContentById',
    });
  }

  /**
   * Download fax content
   * Download the fax content.
   * @param { DownloadFaxContentRequestData } data - The data to provide to the API call.
   */
  public async downloadContent(data: DownloadFaxContentRequestData): Promise<FileBuffer> {
    this.client = this.getSinchClient();
    data['fileFormat'] = data['fileFormat'] !== undefined ? data['fileFormat'] : 'pdf';
    const getParams = this.client.extractQueryParams<DownloadFaxContentRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/pdf',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/faxes/${data['id']}/file.${data['fileFormat']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processFileCall({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetFaxFileById',
    });
  }

  /**
   * Get fax
   * Get fax information using the ID number of the fax.
   * @param { GetFaxRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetFaxRequestData): Promise<Fax> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetFaxRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/faxes/${data['id']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<Fax>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetFaxInfoPerId',
    });
  }

  /**
   * List faxes
   * List faxes sent (OUTBOUND) or received (INBOUND), set parameters to filter the list. Example: Return calls made between 1st of January 2021 and  10th of January 2021. &#x60;&#x60;&#x60;  created&gt;&#x3D;2021-01-01&amp;startTime&lt;&#x3D;2021-01-10 &#x60;&#x60;&#x60;
   * @param { ListFaxesRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<Fax>}
   */
  public list(data: ListFaxesRequestData): ApiListPromise<Fax> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListFaxesRequestData>(data, [
      'direction',
      'status',
      'to',
      'from',
      'pageSize',
      'page']);
    (getParams as any).createTime = JSON.stringify(this.formatCreateTimeFilter(data.createTime));
    (getParams as any)['createTime>'] = JSON.stringify(this.formatCreateTimeRangeFilter(data.createTimeRange?.from));
    (getParams as any)['createTime<'] = JSON.stringify(this.formatCreateTimeRangeFilter(data.createTimeRange?.to));

    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/faxes`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE3,
      apiName: this.apiName,
      operationId: 'GetFaxes',
      dataKey: 'faxes',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<Fax>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<Fax>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<Fax>;
  }

  formatCreateTimeFilter = (createTime: string | Date | undefined): string | undefined => {
    if (createTime !== undefined) {
      if (typeof createTime === 'string') {
        if (createTime.indexOf('T') > -1) {
          return createTime.substring(0, createTime.indexOf('T'));
        }
        return createTime;
      } else {
        return formatDate(createTime, 'day');
      }
    }
    return undefined;
  };

  formatCreateTimeRangeFilter = (timeBoundary: string | Date | DateFormat | undefined): string | undefined => {
    if (timeBoundary !== undefined) {
      if (typeof timeBoundary === 'string') {
        return timeBoundary;
      } else if (timeBoundary instanceof Date) {
        return formatDate(timeBoundary);
      } else {
        return formatDate(timeBoundary.date, timeBoundary.unit);
      }
    }
    return undefined;
  };

  /**
   * Send a fax or multiple faxes
   * Create and send one or multiple faxes. Fax content may be supplied via one or more files or URLs of supported filetypes.
   * This endpoint supports the following content types for the fax payload:
   *   - Multipart/form-data
   *   - Application/json
   * We will however always return a fax array in the response in application json.
   * If you supply a callbackUrl the callback will be sent as multipart/form-data with the content of the fax as an attachment to the body, *unless* you specify callbackUrlContentType as application/json.
   * #### file(s)
   *    Files may be included in the POST request as multipart/form-data parts.
   * #### contentUrl
   *    Any URL on the Internet (including ones with basic authentication), and we'll pull it down and make it a fax. This might be useful to you if you're using a web framework for templates and creating fax files.
   *    Please note: If you are passing fax a secure URL (starting with 'https://'), make sure that your SSL certificate (including your intermediate cert, if you have one) is installed properly, valid, and up-to-date.
   * @param { SendFaxRequestData } data - The data to provide to the API call.
   */
  public async send(data: SendFaxRequestData): Promise<Fax[]> {
    this.client = this.getSinchClient();
    const requestBody = data.sendFaxRequestBody;
    requestBody['headerText'] = requestBody['headerText'] !== undefined
      ? requestBody['headerText'] : '';
    requestBody['headerPageNumbers'] = requestBody['headerPageNumbers'] !== undefined
      ? requestBody['headerPageNumbers'] : true;
    requestBody['headerTimeZone'] = requestBody['headerTimeZone'] !== undefined
      ? requestBody['headerTimeZone'] : 'America/New_York';
    requestBody['retryDelaySeconds'] = requestBody['retryDelaySeconds'] !== undefined
      ? requestBody['retryDelaySeconds'] : 60;
    requestBody['callbackUrlContentType'] = requestBody['callbackUrlContentType'] !== undefined
      ? requestBody['callbackUrlContentType'] : 'multipart/form-data';
    requestBody['imageConversionMethod'] = requestBody['imageConversionMethod'] !== undefined
      ? requestBody['imageConversionMethod'] : 'HALFTONE';
    const getParams
      = this.client.extractQueryParams<SendSingleFaxRequestData | SendMultipleFaxRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Accept': 'application/json',
    };

    let body: RequestBody;
    // Except if the request body contains a non-empty property 'files' (where the message will be sent as application/json)
    // the request will be sent as multipart/formdata
    const isUsingJson = (data['sendFaxRequestBody'] as FaxRequestJson).files !== undefined;
    if (isUsingJson) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data['sendFaxRequestBody']);
    } else {
      const formData = new FormData();
      let requestData;
      if (Array.isArray(data.sendFaxRequestBody.to)) {
        requestData = data.sendFaxRequestBody as MultipleFaxRequestFormData;
        requestData.to.forEach((to) => formData.append('to', to));
      } else {
        requestData = data.sendFaxRequestBody as SingleFaxRequestFormData;
        formData.append('to', requestData.to);
      }
      if (requestData.filePaths) {
        let attachmentPaths = requestData.filePaths;
        if (typeof attachmentPaths === 'string') {
          attachmentPaths = [String(requestData.filePaths)];
        }
        attachmentPaths.forEach((filePath) => {
          formData.append('file', fs.readFileSync(filePath), filePath.split('/').pop());
        });
      }
      if (requestData.from) {
        formData.append('from', requestData.from);
      }
      if (requestData.contentUrl) {
        formData.append('contentUrl', requestData.contentUrl);
      }
      if (requestData.headerText) {
        formData.append('headerText', requestData.headerText);
      }
      if (requestData.headerPageNumbers) {
        formData.append('headerPageNumbers', requestData.headerPageNumbers.toString());
      }
      if (requestData.headerTimeZone) {
        formData.append('headerTimeZone', requestData.headerTimeZone);
      }
      if (requestData.retryDelaySeconds) {
        formData.append('retryDelaySeconds', requestData.retryDelaySeconds);
      }
      if (requestData.labels) {
        formData.append('labels', requestData.labels);
      }
      if (requestData.callbackUrl) {
        formData.append('callbackUrl', requestData.callbackUrl);
      }
      if (requestData.callbackUrlContentType) {
        formData.append('callbackUrlContentType', requestData.callbackUrlContentType);
      }
      if (requestData.imageConversionMethod) {
        formData.append('imageConversionMethod', requestData.imageConversionMethod);
      }
      if (requestData.serviceId) {
        formData.append('serviceId', requestData.serviceId);
      }
      if (requestData.maxRetries) {
        formData.append('maxRetries', requestData.maxRetries);
      }
      body = formData;
    }

    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/faxes`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    if (Array.isArray(data.sendFaxRequestBody.to)) {
      const responseData = await this.client.processCall<Fax | FaxesList>({
        url,
        requestOptions,
        apiName: this.apiName,
        operationId: 'SendMultipleFax',
      });
      // When there is a single element in the 'to' array, the server will return a Fax, not a FaxList
      if (Array.isArray((responseData as FaxesList).faxes)) {
        return (responseData as FaxesList).faxes;
      } else {
        return [responseData as Fax];
      }
    } else {
      const responseData =  await this.client.processCall<Fax>({
        url,
        requestOptions,
        apiName: this.apiName,
        operationId: 'SendFax',
      });
      return [responseData];
    }

  }

}
