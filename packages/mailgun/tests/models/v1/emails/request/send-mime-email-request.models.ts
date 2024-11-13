import { Mailgun } from '../../../../../src';

export const sendMimeEmailRequest: Mailgun.SendMimeEmailRequest = {
  to: 'to value',
  message: 'message value',
  template: 'template value',
  templateProperties: {
    version: 'version value',
    text: 'text value',
    variables: 'variables value',
  },
  overrideProperties: {
    tag: 'tag value',
    sendingIp: 'sendingIp value',
    sendingIpPool: 'sendingIpPool value',
    deliveryTime: 'deliveryTime value',
    deliveryTimeOptimizePeriod: 'deliveryTimeOptimizePeriod value',
    enableDkimSignature: 'enableDkimSignature value',
    secondaryDkim: 'secondaryDkim value',
    secondaryDkimPublic: 'secondaryDkim value',
    requireTls: 'requireTls value',
    skipVerification: 'skipVerification value',
    timeZoneLocalize: 'timeZoneLocalize value',
    tracking: 'tracking value',
    trackingClicks: 'trackingClicks value',
    trackingOpens: 'trackingOpens value',
    trackingPixelLocationTop: 'trackingPixelLocationTop value',
    isTestMode: false,
  },
  'h:X-Mailgun-Sending-Ip-Pool': 'xx.xx.xxx.x',
  'v:first_name': 'John',
  'v:last_name': 'Smith',
  'v:my_message_id': 123,
};
