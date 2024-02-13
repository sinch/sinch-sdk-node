import { DeliveryReport, MOBinary, MOText, RecipientDeliveryReport } from '../../../models';
import { CallbackProcessor } from '@sinch/sdk-client';
import { IncomingHttpHeaders } from 'http';

export type SmsCallback = DeliveryReport | RecipientDeliveryReport | MOText | MOBinary;

export class SmsCallbackWebhooks implements CallbackProcessor<SmsCallback>{

  public validateAuthenticationHeader(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _headers: IncomingHttpHeaders, _body: any, _path: string, _method: string,
  ): boolean {
    // No header validation is implemented for SMS API
    return true;
  }

  /**
   * Reviver for an SMS Event.
   * This method ensures the object can be treated as an SMS Event and should be called before any action is taken to manipulate the object.
   * @param {any} eventBody - The event body containing the SMS event notification.
   * @return {SmsCallback} - The parsed SMS event object
   */
  public parseEvent(eventBody: any): SmsCallback {
    if (eventBody.type) {
      let recipientDeliveryReport: RecipientDeliveryReport | null = null;
      let moText: MOText | null = null;
      let moBinary: MOBinary | null = null;
      switch (eventBody.type) {
      case 'delivery_report_sms':
      case 'delivery_report_mms':
        return eventBody as DeliveryReport;
      case 'recipient_delivery_report_sms':
      case 'recipient_delivery_report_mms':
        recipientDeliveryReport = eventBody as RecipientDeliveryReport;
        if (recipientDeliveryReport.at) {
          recipientDeliveryReport.at = new Date(recipientDeliveryReport.at);
        }
        if (recipientDeliveryReport.operator_status_at) {
          recipientDeliveryReport.operator_status_at = new Date(recipientDeliveryReport.operator_status_at);
        }
        return recipientDeliveryReport;
      case 'mo_text':
        moText = eventBody as MOText;
        if (moText.received_at) {
          moText.received_at = new Date(moText.received_at);
        }
        if (moText.sent_at) {
          moText.sent_at = new Date(moText.sent_at);
        }
        return moText;
      case 'mo_binary':
        moBinary = eventBody as MOBinary;
        if (moBinary.received_at) {
          moBinary.received_at = new Date(moBinary.received_at);
        }
        if (moBinary.sent_at) {
          moBinary.sent_at = new Date(moBinary.sent_at);
        }
        return moBinary;
      default:
        throw new Error(`Unknown SMS event type: ${eventBody.type}`);
      }
    }
    console.log(eventBody);
    throw new Error('Unknown SMS event');
  };

}


