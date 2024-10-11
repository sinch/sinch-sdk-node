/**
 * Conversion errors usually occur when there is a problem with one of the files you posted.
 */
export interface DocumentConversionError {
  /** Type of error for the Document conversion */
  errorType?: 'DOCUMENT_CONVERSION_ERROR';
  /** The error message */
  errorMessage?: string;
  /** The error code returned during document conversion. */
  errorCode?: DocumentConversionErrorCodeEnum;
}

export type DocumentConversionErrorCodeEnum = '4' | '54' | '55' | '57' | '69' | '122'
  | '128' | '129' | '130' | '133 | string';
