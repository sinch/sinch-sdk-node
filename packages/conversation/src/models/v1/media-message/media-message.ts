/**
 * A message containing a media component, such as an image, document, or video.
 */
export interface MediaMessage {

  /** A message containing a media component, such as an image, document, or video. */
  media_message: MediaMessageItem;
}
export interface MediaMessageItem {

  /** An optional parameter. Will be used where it is natively supported. */
  thumbnail_url?: string;
  /** Url to the media file. */
  url: string;
  /** Overrides the media file name. */
  filename_override?: string;
}
