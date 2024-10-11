export type ImageConversionMethod = 'HALFTONE' | 'MONOCHROME' | string;

export type WebhookContentType = 'multipart/form-data' | 'application/json' | string;

/**
 * The direction of the fax.
 */
export type FaxDirection = 'OUTBOUND' | 'INBOUND' | string;

/**
 * The status of the fax
 */
export type FaxStatus = 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILURE' | string;

/**
 * Type of error for the fax
 */
export type ErrorType =
  'DOCUMENT_CONVERSION_ERROR'
  | 'CALL_ERROR'
  | 'FAX_ERROR'
  | 'FATAL_ERROR'
  | 'GENERAL_ERROR'
  | 'LINE_ERROR'
  | string;

export type FaxBase64FileType = 'DOCX' | 'PDF' | 'TIF' | 'JPG' | 'TXT' | 'HTML' | 'PNG' | string;

export const validBase64FileTypes: FaxBase64FileType[]
  = ['DOCX', 'PDF', 'TIF', 'JPG', 'TXT', 'HTML', 'PNG'];

export type FaxWebhookEvent = 'INCOMING_FAX' | 'FAX_COMPLETED' | string;

export type BarCodeType = 'CODE_128' | 'DATA_MATRIX' | string;
