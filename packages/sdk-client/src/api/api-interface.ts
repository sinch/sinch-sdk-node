import { ApiClient } from './api-client';

/** API interface */
export interface Api {
  /** API name */
  apiName: string;
  /** API Client used to process the calls to the API */
  client?: ApiClient;
}

export interface FileBuffer {
  /** Name of the file extracted from the 'content-disposition' header */
  fileName: string;
  /** File content as Buffer */
  buffer: Buffer;
}
