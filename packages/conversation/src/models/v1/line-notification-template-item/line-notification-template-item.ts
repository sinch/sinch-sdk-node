/**
 * Template item
 */
export interface LineNotificationTemplateItem {
  /** Item key. See [LINE documentation](https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/?r=jp#items) for available keys */
  item_key: string;
  /** Item value */
  content: string;
}
