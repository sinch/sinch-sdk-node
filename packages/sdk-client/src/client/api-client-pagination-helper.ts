import {
  ApiCallParametersWithPagination,
  ApiClient,
  ApiListPromise,
  AutoPaginationMethods,
  PageResult,
  PaginatedApiProperties,
  PaginationEnum,
} from '../api/api-client';
import { RequestOptions } from '../plugins/core/request-plugin';

class SinchIterator<T> implements AsyncIterator<T> {

  private index: number;
  private pagePromise: Promise<PageResult<T>>;
  public requestOptionsPromise: Promise<RequestOptions>;
  public paginatedOperationProperties: PaginatedApiProperties;
  public apiClient: ApiClient;

  constructor(
    apiClient: ApiClient,
    requestOptionsPromise: Promise<RequestOptions>,
    firstPagePromise: Promise<PageResult<T>>,
    context: PaginatedApiProperties,
  ) {
    this.index = 0;
    this.apiClient = apiClient;
    this.pagePromise = firstPagePromise;
    this.requestOptionsPromise = requestOptionsPromise;
    this.paginatedOperationProperties = context;
  }

  async iterate(pageResult: PageResult<T>): Promise<IteratorResult<T>> {
    // If there are more elements to return on the current page
    if(this.index < pageResult.data.length) {
      const value = pageResult.data[this.index];
      this.index += 1;
      return { value, done: false };
    }
    // If there are other pages to getch
    else if (pageResult.hasNextPage) {
      // Reset counter to the first index of the next page
      this.index = 0;
      // Reset the current page to the next one - 'getNextPage' has different implementation depending on the pagination type (TOKEN or PAGE)
      this.pagePromise = this.getNextPage(pageResult);
      // Recursively call the iterator on the next page
      const nextPageResponse = await this.pagePromise;
      return this.iterate(nextPageResponse);
    }
    // No more element on the current page and no more pages to fetch
    return { value: undefined, done: true };
  }

  async getNextPage(pageResult: PageResult<T>): Promise<PageResult<T>> {
    const requestOptions = await this.requestOptionsPromise;
    if (this.paginatedOperationProperties.pagination === PaginationEnum.TOKEN) {
      const newParams = {
        pageToken: pageResult.nextPageValue,
      };
      return updateQueryParamsAndSendRequest(
        this.apiClient, newParams, requestOptions, this.paginatedOperationProperties);
    }
    if (this.paginatedOperationProperties.pagination === PaginationEnum.TOKEN2) {
      const newParams = {
        page_token: pageResult.nextPageValue,
      };
      return updateQueryParamsAndSendRequest(
        this.apiClient, newParams, requestOptions, this.paginatedOperationProperties);
    }
    if (this.paginatedOperationProperties.pagination === PaginationEnum.PAGE
      || this.paginatedOperationProperties.pagination === PaginationEnum.PAGE3) {
      const newParams = {
        page: pageResult.nextPageValue,
      };
      return updateQueryParamsAndSendRequest(
        this.apiClient,newParams, requestOptions, this.paginatedOperationProperties);
    }
    throw new Error(`The operationId "${this.paginatedOperationProperties.operationId}" must define a pagination model`);
  }

  next(): Promise<IteratorResult<T>> {
    return (async (): Promise<IteratorResult<T>> => {
      return this.iterate(await this.pagePromise);
    })();
  }

}

const updateQueryParamsAndSendRequest = <T>(
  apiClient: ApiClient,
  newParams: { [key: string]: string },
  requestOptions: RequestOptions,
  paginatedApiProperties: PaginatedApiProperties,
): Promise<PageResult<T>> => {
  const newQueryParams = {
    ...requestOptions.queryParams,
    ...newParams,
  };
  const newRequestOptions: RequestOptions = {
    ...requestOptions,
    queryParams: newQueryParams,
  };
  const newUrl = apiClient.prepareUrl(
    requestOptions.hostname,
    newQueryParams,
  );
  return apiClient.processCallWithPagination<T>({
    url: newUrl,
    requestOptions: newRequestOptions,
    ...paginatedApiProperties,
  });
};

export const createIteratorMethodsForPagination = <T>(
  apiClient: ApiClient,
  requestOptionsPromise: Promise<RequestOptions>,
  firstPagePromise: Promise<PageResult<T>>,
  context: PaginatedApiProperties,
): AutoPaginationMethods<T> => {
  const iterator = new SinchIterator(apiClient, requestOptionsPromise, firstPagePromise, context);
  const autoPaginationMethods: AutoPaginationMethods<T> = {
    next: () => iterator.next(),
    return: (): any => {
      return {};
    },
    [Symbol.asyncIterator]: () => {
      return autoPaginationMethods;
    },
  };
  return autoPaginationMethods;
};

export const createNextPageMethod = <T>(
  apiClient: ApiClient,
  context: PaginationContext,
  requestOptions: RequestOptions,
  nextPageValue: string,
): ApiListPromise<T> => {
  let newParams;
  switch (context.pagination) {
  case PaginationEnum.TOKEN:
    newParams = {
      pageToken: nextPageValue,
    };
    break;
  case PaginationEnum.TOKEN2:
    newParams = {
      page_token: nextPageValue,
    };
    break;
  case PaginationEnum.PAGE:
  case PaginationEnum.PAGE2:
  case PaginationEnum.PAGE3:
    newParams = {
      page: nextPageValue,
    };
    break;
  default:
    throw new Error(`Error: the pagination method (${context.pagination}) is not supported`);
  }

  const pageResultPromise = updateQueryParamsAndSendRequest<T>(apiClient, newParams, requestOptions, context);

  const requestOptionsPromise = new Promise<RequestOptions>((resolve) => {
    resolve(requestOptions);
  });

  // Add properties to the Promise to offer the possibility to use it as an iterator
  Object.assign(
    pageResultPromise,
    createIteratorMethodsForPagination<T>(apiClient, requestOptionsPromise, pageResultPromise, context),
  );

  return pageResultPromise as ApiListPromise<T>;
};

export function hasMore(
  response: any,
  context: PaginationContext,
): boolean {
  if (context.pagination === PaginationEnum.TOKEN) {
    return !!response['nextPageToken'];
  }
  if (context.pagination === PaginationEnum.TOKEN2) {
    return !!response['next_page_token'];
  }
  if (context.pagination === PaginationEnum.PAGE) {
    const requestedPageSize = context.requestOptions.queryParams?.page_size;
    const pageSize: number = requestedPageSize ? parseInt(requestedPageSize) : response.page_size;
    return checkIfThereAreMorePages(response, pageSize, PaginationEnum.PAGE);
  }
  if (context.pagination === PaginationEnum.PAGE2) {
    const requestedPageSize = context.requestOptions.queryParams?.pageSize;
    const pageSize: number = requestedPageSize ? parseInt(requestedPageSize) : response.pageSize;
    return checkIfThereAreMorePages(response, pageSize, PaginationEnum.PAGE2);
  }
  if (context.pagination === PaginationEnum.PAGE3) {
    return response.pageNumber < response.totalPages;
  }
  throw new Error(`The operation ${context.operationId} is not meant to be paginated.`);
}

export function calculateNextPage(
  response: any,
  context: PaginationContext,
): string {
  if (context.pagination === PaginationEnum.TOKEN) {
    return response['nextPageToken'];
  }
  if (context.pagination === PaginationEnum.TOKEN2) {
    return response['next_page_token'];
  }
  if (context.pagination === PaginationEnum.PAGE) {
    const currentPage: number = response.page || 0;
    const nextPage = currentPage + 1;
    return nextPage.toString();
  }
  if (context.pagination === PaginationEnum.PAGE2 || context.pagination === PaginationEnum.PAGE3) {
    const currentPage: number = response.pageNumber || 1;
    const nextPage = currentPage + 1;
    return nextPage.toString();
  }
  throw new Error(`The operation ${context.operationId} is not meant to be paginated.`);
}

export interface PaginationContext {
  pagination: PaginationEnum;
  apiName: string;
  operationId: string;
  dataKey: string;
  requestOptions: RequestOptions;
}

export function buildPaginationContext(props: ApiCallParametersWithPagination): PaginationContext {
  return {
    pagination: props.pagination,
    apiName: props.apiName,
    operationId: props.operationId,
    dataKey: props.dataKey,
    requestOptions: props.requestOptions!,
  };
}

export const buildPageResultPromise = async  <T>(
  client: ApiClient,
  requestOptionsPromise: Promise<RequestOptions>,
  operationProperties: PaginatedApiProperties,
  repeatParamArray?: boolean,
): Promise<PageResult<T>> => {
  // Await the promise in this async method and store the result in client so that they can be reused
  const requestOptions = await requestOptionsPromise;
  const url = client.prepareUrl(
    requestOptions.hostname, requestOptions.queryParams, repeatParamArray);

  return client.processCallWithPagination<T>({
    url,
    requestOptions,
    ...operationProperties,
  });
};

interface WithPagination extends WithPagination_PAGE, WithPagination_PAGE2 {}

interface WithPagination_PAGE {
  /** The total number of entries matching the given filters. */
  count?: number;
  /** The requested page. */
  page?: number;
  /** The number of entries returned in this request. */
  page_size?: number;
}

interface WithPagination_PAGE2 {
  /** The total number of entries matching the given filters. */
  totalItems?: number;
  /** The requested page. */
  pageNumber?: number;
  /** The number of entries returned in this request. */
  pageSize?: number;
}

const checkIfThereAreMorePages = (
  response: WithPagination,
  requestedPageSize: number,
  paginationType: PaginationEnum.PAGE | PaginationEnum.PAGE2,
): boolean => {
  const lastPageNumber = calculateLastPageValue(response, requestedPageSize, paginationType);
  switch (paginationType) {
  case PaginationEnum.PAGE:
    return response.page! < lastPageNumber;
  case PaginationEnum.PAGE2:
    return response.pageNumber! < lastPageNumber;
  }
};

const calculateLastPageValue = (
  response: WithPagination,
  pageSize: number,
  paginationType: PaginationEnum.PAGE | PaginationEnum.PAGE2,
): number => {
  if (invalidatePaginationDataFromResponse(response, paginationType)) {
    throw new Error(`Impossible to calculate the last page value with the following parameters: count=${response.count}, page=${response.page}, page_size=${response.page_size}`);
  }
  if (response.page_size === 0 || response.pageSize === 0) {
    // If there are no elements on the current page, there are no more pages
    return response.page!;
  }
  // The elements in the response are not enough to determine if the current page is the last one
  switch (paginationType) {
  case PaginationEnum.PAGE:
    return Math.ceil(response.count! / pageSize) - 1;
  case PaginationEnum.PAGE2:
    return Math.ceil(response.totalItems! / pageSize) - 1;
  }
};

const invalidatePaginationDataFromResponse = (
  response: WithPagination,
  paginationType: PaginationEnum.PAGE | PaginationEnum.PAGE2,
): boolean => {
  const currentPage = getCurrentPage(response, paginationType);
  const pageSize = getPageSize(response, paginationType);
  const itemCount = getItemCount(response, paginationType);
  return !isNumber(currentPage) || !isNumber(pageSize) || !isNumber(itemCount);
};

const getCurrentPage = (
  response: WithPagination,
  paginationType: PaginationEnum.PAGE | PaginationEnum.PAGE2,
): number | undefined => {
  switch (paginationType) {
  case PaginationEnum.PAGE:
    return response.page;
  case PaginationEnum.PAGE2:
    return response.pageNumber;
  }
};

const getPageSize = (
  response: WithPagination,
  paginationType: PaginationEnum.PAGE | PaginationEnum.PAGE2,
): number | undefined => {
  switch (paginationType) {
  case PaginationEnum.PAGE:
    return response.page_size;
  case PaginationEnum.PAGE2:
    return response.pageSize;
  }
};

const getItemCount = (
  response: WithPagination,
  paginationType: PaginationEnum.PAGE | PaginationEnum.PAGE2,
): number | undefined => {
  switch (paginationType) {
  case PaginationEnum.PAGE:
    return response.count;
  case PaginationEnum.PAGE2:
    return response.totalItems;
  }
};

const isNumber = (value: any) => {
  return typeof value === 'number' && !isNaN(value);
};
