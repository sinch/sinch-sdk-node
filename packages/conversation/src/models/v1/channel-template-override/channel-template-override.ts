import { ChannelTemplateReference } from '../channel-template-reference';

/**
 * Optional field to override the omnichannel template by referring to a channel-specific template.
 */
export interface ChannelTemplateOverride {

  /** @see ChannelTemplateReference */
  WHATSAPP?: ChannelTemplateReference;
  /** @see ChannelTemplateReference */
  KAKAOTALK?: ChannelTemplateReference;
}
