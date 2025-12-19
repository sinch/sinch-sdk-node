export interface ShareLocationMessage {
  /** The title is shown close to the button that leads to open a map to share a location. */
  title: string;
  /** The URL that is opened when channel does not have support for this type. */
  fallback_url: string;
}
