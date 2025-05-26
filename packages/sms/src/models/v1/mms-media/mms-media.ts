/**
 * Collection of attachments in incoming message.
 */
export interface MmsMedia {
  /** The result code. Possible values: 0 (success), 1 (content upload error), 2 (cloud bucket error), 3 (bucket key error). */
  code: number;
  /** Content type of binary. [More info](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) */
  content_type: string;
  /** Status of the uploaded media. */
  status: 'Uploaded' | 'Failed' | string;
  /** URL to be used to download attachment. */
  url?: string;
}
