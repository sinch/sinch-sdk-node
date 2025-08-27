/**
 * The identifier of the channel you want to include. Must be one of the enum values except 'CHANNEL_UNSPECIFIED'.
 */
export type ConversationChannel =
  'WHATSAPP'
  | 'RCS'
  | 'SMS'
  | 'MESSENGER'
  | 'VIBERBM'
  | 'MMS'
  | 'INSTAGRAM'
  | 'TELEGRAM'
  | 'KAKAOTALK'
  | 'KAKAOTALKCHAT'
  | 'LINE'
  | 'SINCH_CHAT'
  | 'WECHAT'
  | 'APPLEBC'
  | 'CHANNEL_UNSPECIFIED'
  | string;

export type TemplateChannel =
  'UNSPECIFIED'
  | 'CONVERSATION'
  | 'MESSENGER'
  | 'WHATSAPP'
  | 'RCS'
  | 'SMS'
  | 'VIBERBM'
  | 'TELEGRAM'
  | 'INSTAGRAM'
  | 'KAKAOTALK'
  | 'APPLEBC'
  | string;
