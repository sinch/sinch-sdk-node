import { LineNotificationTemplateItem } from '../line-notification-template-item';
import { LineNotificationTemplateButton } from '../line-notification-template-button';

/**
 * Template body
 */
export interface LineNotificationTemplateBody {
  /** Template emphasized item */
  emphasized_item?: LineNotificationTemplateItem;
  /** List of template items */
  items?: LineNotificationTemplateItem[];
  /** List of template buttons */
  buttons?: LineNotificationTemplateButton[];
}
