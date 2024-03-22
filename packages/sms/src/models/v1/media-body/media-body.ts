/**
 * The message content, including a URL to the media file
 */
export interface MediaBody {
  /** The message text. Text only media messages will be rejected, please use SMS instead. */
  message?: string;
  /** URL to the media file */
  url: string;
}


