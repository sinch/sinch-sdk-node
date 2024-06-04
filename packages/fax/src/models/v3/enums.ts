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
 * Type of error for the fax
 */
export type ErrorType =
  'DOCUMENT_CONVERSION_ERROR'
  | 'CALL_ERROR'
  | 'FAX_ERROR'
  | 'FATAL_ERROR'
  | 'GENERAL_ERROR'
  | 'LINE_ERROR';

export type FaxBase64FileType = 'DOC' | 'DOCX' | 'PDF' | 'TIF' | 'JPG' | 'ODT' | 'TXT' | 'HTML' | 'PNG';

export const validBase64FileTypes: FaxBase64FileType[]
  = ['DOC', 'DOCX', 'PDF', 'TIF', 'JPG', 'ODT', 'TXT', 'HTML', 'PNG'];

export type FaxWebhookEvent = 'INCOMING_FAX' | 'FAX_COMPLETED';
