/**
 * Object which contains information of a comment made by a user outside  the main conversation context. Currently only supported on Instagram channel, see Instagram Private Replies for more details
 */
export interface CommentEvent {
  /** The user sent a comment outside of the main conversation context */
  comment_event: CommentEventItem;
}

export interface CommentEventItem {
  /** Event's ID */
  id?: string;
  /** Comment's text */
  text?: string;
  /** Either LIVE or FEED. Indicates the type of media on which the comment was made. */
  comment_type?: 'FEED' | 'LIVE';
  /** Instagram's URL of the live broadcast or the post on which the comment was made (permalink). */
  commented_on?: string;
  /** Username of the account that commented in the live broadcast or post. */
  user?: string;
}
