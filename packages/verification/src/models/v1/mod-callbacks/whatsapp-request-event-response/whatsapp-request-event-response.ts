import { ActionEnum, WhatsAppCodeType } from '../../enums';
import { WithAdditionalProperties } from '@sinch/sdk-client';

export interface WhatsAppRequestEventResponse {
  /** Determines whether the verification can be executed. */
  action?: ActionEnum;
  /** @see WhatsAppProperties */
  whatsapp?: WhatsAppProperties;
}

export interface WhatsAppProperties extends WithAdditionalProperties {
  /** Selects type of code which will be sent to customer */
  codeType?: WhatsAppCodeType;
  /** The WhatsApp verification content language. Set in the verification request. */
  acceptLanguage?: string[];
}
