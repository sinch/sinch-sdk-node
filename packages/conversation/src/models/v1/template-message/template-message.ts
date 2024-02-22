import { TemplateReference } from '../template-reference';
import { ConversationChannel } from '../conversation-channel';

export interface TemplateMessage {

  /** */
  template_message: TemplateMessageItem;
}

export interface TemplateMessageItem {

  /** Optional. Channel specific template reference with parameters per channel. The channel template if exists overrides the omnichannel template. At least one of `channel_template` or `omni_template` needs to be present. The key in the map must point to a valid conversation channel as defined by the enum ConversationChannel. */
  channel_template?: { [key in ConversationChannel]?: TemplateReference; };
  /** @see TemplateReference */
  omni_template?: TemplateReference;
}
