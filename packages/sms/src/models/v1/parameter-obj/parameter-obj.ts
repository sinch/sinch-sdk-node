import { ParameterObjParameterKey } from '../parameter-obj-parameter-key';

/**
 * Contains the parameters that will be used for customizing the message for each recipient.   [Click here to learn more about parameterization](/docs/sms/resources/message-info/message-parameterization).
 */
export interface ParameterObj extends Record<string, any> {

  /** @see ParameterObjParameterKey */
  '{parameter_key}'?: ParameterObjParameterKey;
}


