import { Mailgun } from '../../../../../src';

export const sendMimeEmailRequest: Mailgun.SendMimeEmailRequest = {
  to: 'to value',
  message: 'message value',
  template: 'template value',
  templateProperties: {
    version: 'version value',
    text: true,
    variables: {
      orders: [
        {
          id: 123,
          name: 'Dark Chocolate Box',
        },
        {
          id: 456,
          name: 'Calissons x12',
        },
      ],
    },
  },
  overrideProperties: {
    tag: 'tag value',
    sendingIp: 'sendingIp value',
    sendingIpPool: 'sendingIpPool value',
    deliveryTime: new Date('2024-06-06T13:42:42Z'),
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
  customHeaders: {
    'X-Mailgun-Sending-Ip-Pool': 'xx.xx.xxx.x',
  },
  customVariables: {
    'first_name': 'John',
    'last_name': 'Smith',
    'my_message_id': 123,
  },
};
