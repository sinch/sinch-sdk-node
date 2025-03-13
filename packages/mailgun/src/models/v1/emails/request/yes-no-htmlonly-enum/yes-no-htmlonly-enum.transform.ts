import { YesNoHtmlonlyEnum } from './yes-no-htmlonly-enum';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformYesNoHtmlonlyEnumIntoApiRequestFormat = (sdkValue: YesNoHtmlonlyEnum): string => {
  return String(sdkValue);
};
