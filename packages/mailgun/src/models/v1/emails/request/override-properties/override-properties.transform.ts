import { OverrideProperties } from './override-properties';
import { appendDeliveryTimeOptimizePeriodToFormData } from '../helpers';
import { transformDateIntoApiRequestFormat } from '../helpers';
import { transformYesNoHtmlonlyEnumIntoApiRequestFormat } from '../yes-no-htmlonly-enum/yes-no-htmlonly-enum.transform';
import { transformYesNoEnumIntoApiRequestFormat } from '../yes-no-enum/yes-no-enum.transform';
import { appendArrayToFormData } from '../helpers';
import FormData = require('form-data');

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const appendOverridePropertiesToFormData = (sdkRequest: OverrideProperties, formData: FormData): FormData => {
  if (sdkRequest['tag'] != null) {
    appendArrayToFormData(sdkRequest['tag'], 'o:tag', formData);
  }
  if (sdkRequest['deliveryTimeOptimizePeriod'] != null) {
    appendDeliveryTimeOptimizePeriodToFormData(sdkRequest, formData);
  }
  if (sdkRequest['enableDkimSignature'] != null) {
    formData.append('o:dkim', String(sdkRequest['enableDkimSignature']));
  }
  if (sdkRequest['secondaryDkim'] != null) {
    formData.append('o:secondary-dkim', sdkRequest['secondaryDkim']);
  }
  if (sdkRequest['secondaryDkimPublic'] != null) {
    formData.append('o:secondary-dkim-public', sdkRequest['secondaryDkimPublic']);
  }
  if (sdkRequest['deliveryTime'] != null) {
    formData.append('o:deliverytime', transformDateIntoApiRequestFormat(sdkRequest['deliveryTime']));
  }
  if (sdkRequest['timeZoneLocalize'] != null) {
    formData.append('o:time-zone-localize', sdkRequest['timeZoneLocalize']);
  }
  if (sdkRequest['trackingClicks'] != null) {
    formData.append('o:tracking-clicks', transformYesNoHtmlonlyEnumIntoApiRequestFormat(sdkRequest['trackingClicks']));
  }
  if (sdkRequest['tracking'] != null) {
    formData.append('o:tracking', transformYesNoHtmlonlyEnumIntoApiRequestFormat(sdkRequest['tracking']));
  }
  if (sdkRequest['trackingOpens'] != null) {
    formData.append('o:tracking-opens', transformYesNoEnumIntoApiRequestFormat(sdkRequest['trackingOpens']));
  }
  if (sdkRequest['trackingPixelLocationTop'] != null) {
    formData.append(
      'o:tracking-pixel-location-top',
      transformYesNoHtmlonlyEnumIntoApiRequestFormat(sdkRequest['trackingPixelLocationTop']),
    );
  }
  if (sdkRequest['sendingIp'] != null) {
    formData.append('o:sending-ip', sdkRequest['sendingIp']);
  }
  if (sdkRequest['sendingIpPool'] != null) {
    formData.append('o:sending-ip-pool', sdkRequest['sendingIpPool']);
  }
  if (sdkRequest['requireTls'] != null) {
    formData.append('o:require-tls', String(sdkRequest['requireTls']));
  }
  if (sdkRequest['skipVerification'] != null) {
    formData.append('o:skip-verification', String(sdkRequest['skipVerification']));
  }
  if (sdkRequest['isTestMode'] != null) {
    formData.append('o:testmode', String(sdkRequest['isTestMode']));
  }
  return formData;
};
