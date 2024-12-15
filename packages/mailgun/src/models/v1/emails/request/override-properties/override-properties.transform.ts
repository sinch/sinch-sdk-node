import { OverrideProperties } from './override-properties';
import FormData = require('form-data');

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const appendOverridePropertiesToFormData = (overrideProperties: OverrideProperties, formData: FormData) => {
  if (overrideProperties['tag'] != null) {
    formData.append('o:tag', overrideProperties['tag']);
  }
  if (overrideProperties['deliveryTimeOptimizePeriod'] != null) {
    formData.append('o:deliverytime-optimize-period', `${overrideProperties['deliveryTimeOptimizePeriod']}h`);
  }
  if (overrideProperties['enableDkimSignature'] != null) {
    formData.append('o:dkim', String(overrideProperties['enableDkimSignature']));
  }
  if (overrideProperties['secondaryDkim'] != null) {
    formData.append('o:secondary-dkim', overrideProperties['secondaryDkim']);
  }
  if (overrideProperties['secondaryDkimPublic'] != null) {
    formData.append('o:secondary-dkim-public', overrideProperties['secondaryDkimPublic']);
  }
  if (overrideProperties['deliveryTime'] != null) {
    formData.append('o:deliverytime', overrideProperties['deliveryTime']);
  }
  if (overrideProperties['timeZoneLocalize'] != null) {
    formData.append('o:time-zone-localize', overrideProperties['timeZoneLocalize']);
  }
  if (overrideProperties['tracking'] != null) {
    formData.append('o:tracking', String(overrideProperties['tracking']));
  }
  if (overrideProperties['trackingClicks'] != null) {
    formData.append('o:tracking-clicks', String(overrideProperties['trackingClicks']));
  }
  if (overrideProperties['trackingOpens'] != null) {
    formData.append('o:tracking-opens', String(overrideProperties['trackingOpens']));
  }
  if (overrideProperties['trackingPixelLocationTop'] != null) {
    formData.append('o:tracking-pixel-location-top', String(overrideProperties['trackingPixelLocationTop']));
  }
  if (overrideProperties['sendingIp'] != null) {
    formData.append('o:sending-ip', overrideProperties['sendingIp']);
  }
  if (overrideProperties['sendingIpPool'] != null) {
    formData.append('o:sending-ip-pool', overrideProperties['sendingIpPool']);
  }
  if (overrideProperties['requireTls'] != null) {
    formData.append('o:require-tls', String(overrideProperties['requireTls']));
  }
  if (overrideProperties['skipVerification'] != null) {
    formData.append('o:skip-verification', String(overrideProperties['skipVerification']));
  }
  if (overrideProperties['isTestMode'] != null) {
    formData.append('o:testmode', String(overrideProperties['isTestMode']));
  }
};
