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

export type DocumentConversionErrorCodeEnum = 4 | 54 | 55 | 57 | 69 | 122
  | 128 | 129 | 130 | 133 | number;

export const documentConversionErrorCodeLabels: Record<DocumentConversionErrorCodeEnum, string> = {
  4: 'There was a problem in converting and merging files to the output file format. Contact support.',
  54: 'Could not access the url you provided. {contentUrl}',
  55: 'The string_data URL you provided is invalid',
  57: 'There was a problem storing the file you provided.',
  69: 'There was a problem storing the file you provided.',
  122: 'User simulated Document Conversion Error',
  128: 'Could not determine mimetype for file.',
  129: 'Mimetype not supported.',
  130: 'Mimetype not supported: application/xml',
  133: 'Failed to normalize PDF document',
};
