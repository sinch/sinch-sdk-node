import { RcsCommentType } from '../rcs-comment-type';

export interface RcsComment {
  /** @see RcsCommentType */
  type: RcsCommentType;
  /** The comment text. */
  comment: string;
  /** When the comment was created. */
  created?: string;
}
