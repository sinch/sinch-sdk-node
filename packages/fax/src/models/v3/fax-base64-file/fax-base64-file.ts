
export interface FaxBase64File {

  /** When application/json Base64 encoded file content, this is only present when using application/json for request/response. */
  file?: string;
  /** When request/response is application json and file is part of payload. This is the file type of the file. */
  fileType?: 'DOC' | 'DOCX' | 'PDF' | 'TIF' | 'JPG' | 'ODT' | 'TXT' | 'HTML' | 'PNG';
}
