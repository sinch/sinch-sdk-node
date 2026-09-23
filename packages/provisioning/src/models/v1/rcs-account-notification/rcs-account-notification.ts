import { RcsAccountNotificationType } from '../rcs-account-notification-type';

export interface RcsAccountNotification {
  /** @see RcsAccountNotificationType */
  type: RcsAccountNotificationType;
  /** When the activity occurred. */
  created?: Date;
  /** Author of the activity. */
  author?: string;
  /** Comment text when type is COMMENT_ADDED. */
  comment?: string;
}
