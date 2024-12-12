import { Mailgun } from '../../../../../src';

export const sendMimeEmailRequest: Mailgun.SendMimeEmailRequest = {
  to: 'to value',
  message: 'message value',
  template: 'template value',
  templateProperties: {
    version: 'version value',
    text: 'yes',
    variables: 'variables value',
  },
  overrideProperties: {
    tag: 'tag value',
    sendingIp: 'sendingIp value',
    sendingIpPool: 'sendingIpPool value',
    deliveryTime: 'deliveryTime value',
    deliveryTimeOptimizePeriod: 72,
    enableDkimSignature: false,
    secondaryDkim: 'secondaryDkim value',
    secondaryDkimPublic: 'secondaryDkimPublic value',
    requireTls: false,
    skipVerification: false,
    timeZoneLocalize: '12:00PM',
    tracking: 'no',
    trackingClicks: 'no',
    trackingOpens: 'no',
    trackingPixelLocationTop: 'no',
    isTestMode: false,
  },
  'h:X-Mailgun-Sending-Ip-Pool': 'xx.xx.xxx.x',
  'v:first_name': 'John',
  'v:last_name': 'Smith',
  'v:my_message_id': 123,
};
