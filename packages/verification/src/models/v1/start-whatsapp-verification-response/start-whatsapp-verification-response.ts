import { LinksObject } from '../links-object';
import { WithAdditionalProperties } from '@sinch/sdk-client';
import { WhatsAppCodeType } from '../enums';

export interface StartWhatsAppVerificationResponse {
  /** Verification identifier used to query for status. */
  id?: string;
  /** The value of the method used for the Verification. For SMS Verifications, this will always be `whatsapp`. */
  method?: 'whatsapp';
  /** The response contains the `template` of the SMS to be expected and intercepted. */
  whatsapp?: WhatsAppContent;
  /** @see LinksObject */
  _links?: LinksObject[];
}

interface WhatsAppContent extends WithAdditionalProperties {
  /** Accepted values for the type of code to be generated are `Numeric`, `Alpha`, and `Alphanumeric`. Default is `Numeric`. */
  codeType?: WhatsAppCodeType;
}
