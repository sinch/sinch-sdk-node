import { LineNotificationTemplateBody } from '../line-notification-template-body';

/**
 * A message type for sending LINE notification messages (template)
 */
export interface LineNotificationTemplate {
  /** Template key. See [LINE documentation](https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/?r=jp#templates) for available keys */
  template_key: string;
  /** @see LineNotificationTemplateBody */
  body?: LineNotificationTemplateBody;
}
