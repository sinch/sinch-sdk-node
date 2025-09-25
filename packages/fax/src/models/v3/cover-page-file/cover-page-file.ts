/**
 * A PDF Cover encoded as base64
 */
export interface CoverPageFile {
  /** A PDF Cover encoded as base64 */
  fileContent: string;
  /** For now only PDF is supported. */
  fileType: 'PDF' | string;
}
