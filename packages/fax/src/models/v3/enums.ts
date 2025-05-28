/**
 * - HALFTONE: Converts the image to halftone.
 * - MONOCHROME: Converts the image to monochrome.
 */
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

/**
 * - CODE_128: Code-128 barcode
 * - DATA_MATRIX: DataMatrix barcode
 */
export type BarCodeType = 'CODE_128' | 'DATA_MATRIX' | string;

/**
 * The resolution for the fax. If this is set at the service, this applies to all faxes sent using that service. If this is set on the fax, this will override the service setting.
 */
export type Resolution = 'FINE' | 'SUPERFINE' | string;

/**
 * - both: 	Allows the email to send and receive faxes to this email/phone number combination.
 * - send:	Allows the email to only send faxes to this email/phone number combination.
 * - receive: Allows the email to only receive faxes from this email/phone number combination.
 */
export type Permissions = 'both' | 'send' | 'receive' | string;
