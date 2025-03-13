import { YesNoEnum } from './yes-no-enum';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformYesNoEnumIntoApiRequestFormat = (sdkValue: YesNoEnum): string => {
  return String(sdkValue);
};
