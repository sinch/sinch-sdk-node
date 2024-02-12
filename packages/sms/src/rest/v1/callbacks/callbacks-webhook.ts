import { DeliveryReport, MOBinary, MOText } from '../../../models';

export type SmsCallback = DeliveryReport | MOText | MOBinary;

export class SmsCallbackWebhooks {

  public parseSmsEventNotification(eventBody: any): SmsCallback {
    if (eventBody.type) {
      switch (eventBody.type) {
      case 'delivery_report_sms':
      case 'delivery_report_mms':
        return eventBody as DeliveryReport;
      case 'mo_text':
        return eventBody as MOText;
      case 'mo_binary':
        return eventBody as MOBinary;
      default:
        throw new Error(`Unknown SMS event type: ${eventBody.type}`);
      }
    }
    console.log(eventBody);
    throw new Error('Unknown SMS event');
  };

}


