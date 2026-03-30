export interface CalendarMessage {
  /** The title is shown close to the button that leads to open a user calendar. */
  title: string;
  /** The timestamp defines start of a calendar event. */
  event_start: Date;
  /** The timestamp defines end of a calendar event. */
  event_end: Date;
  /** Title of a calendar event. */
  event_title: string;
  /** Description of a calendar event. */
  event_description?: string;
  /** The URL that is opened when the user cannot open a calendar event directly or channel does not have support for this type. */
  fallback_url: string;
}
