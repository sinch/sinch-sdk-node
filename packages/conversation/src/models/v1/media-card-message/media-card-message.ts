/**
 * A message containing a media component, such as an image or video.
 */
export interface MediaCardMessage {

  /** Caption for the media on supported channels. */
  caption?: string;
  /** Url to the media file. */
  url: string;
}
