// export type { TypeEnum as BarCodeTypeEnum } from './bar-code/bar-code';
// export type { TypeEnum as CallErrorTypeEnum, ErrorCodeEnum as CallErrorErrorCodeEnum } from './call-error/call-error';
// export type { TypeEnum as DocumentConversionErrorTypeEnum, ErrorCodeEnum as DocumentConversionErrorErrorCodeEnum } from './document-conversion-error/document-conversion-error';
// export type { CallbackContentTypeEnum as FaxCallbackContentTypeEnum, ImageConversionMethodEnum as FaxImageConversionMethodEnum } from './fax/fax';
// export type { FileTypeEnum as FaxBase64FileFileTypeEnum } from './fax-base64-file/fax-base64-file';
// export type { TypeEnum as FaxErrorTypeEnum } from './fax-error/fax-error';
// export type { CallbackContentTypeEnum as SendFaxRequest1CallbackContentTypeEnum, ImageConversionMethodEnum as SendFaxRequest1ImageConversionMethodEnum } from './send-fax-request1/send-fax-request1';

export type ImageConversionMethod = 'HALFTONE' | 'MONOCHROME';

export type WebhookContentType = 'multipart/form-data' | 'application/json';

/**
 * The direction of the fax.
 */
export type FaxDirection = 'OUTBOUND' | 'INBOUND';

/**
 * The status of the fax
 */
export type FaxStatus = 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILURE';

/**
 * Error type
 */
export type ErrorType =
  'DOCUMENT_CONVERSION_ERROR'
  | 'CALL_ERROR'
  | 'FAX_ERROR'
  | 'FATAL_ERROR'
  | 'GENERAL_ERROR'
  | 'LINE_ERROR';
