/**
 * Template button
 */
export interface LineNotificationTemplateButton {
  /** Button key. See [LINE documentation](https://developers.line.biz/en/docs/partner-docs/line-notification-messages/template/?r=jp#buttons) for available keys */
  button_key: string;
  /** Button URL */
  url: string;
}
