export interface CommentReplyEvent {
  /** @see CommentReplyEvent */
  comment_reply_event: CommentReplyEventItem;
}

export interface CommentReplyEventItem {
  /** The text of the comment reply. */
  text: string;
}
