import { DeliveryReport, MOBinary, MOMedia, MOText, RecipientDeliveryReport } from '../../../models';
import { CallbackProcessor, validateWebhookSignature } from '@sinch/sdk-client';
import { IncomingHttpHeaders } from 'http';

export type SmsCallback = DeliveryReport | RecipientDeliveryReport | MOText | MOBinary | MOMedia;

export class SmsCallbackWebhooks implements CallbackProcessor<SmsCallback>{

  private readonly appSecret: string | undefined;

  constructor(appSecret?: string) {
    this.appSecret = appSecret;
  }

  public validateAuthenticationHeader(
    headers: IncomingHttpHeaders,
    body: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _path?: string, _method?: string,
  ): boolean {
    if (!this.appSecret) {
      return false;
    }
    return validateWebhookSignature(
      this.appSecret,
      headers,
      body,
    );
  }

  /**
   * Reviver for an SMS Event.
   * This method ensures the object can be treated as an SMS Event and should be called before any action is taken to manipulate the object.
   * @param {any} eventBody - The event body containing the SMS event notification.
   * @return {SmsCallback} - The parsed SMS event object
   */
  public parseEvent(eventBody: any): SmsCallback {
    if (typeof eventBody === 'string') {
      eventBody = JSON.parse(eventBody);
    }
    if (eventBody.type) {
      let recipientDeliveryReport: RecipientDeliveryReport | null = null;
      let moText: MOText | null = null;
      let moBinary: MOBinary | null = null;
      let moMedia: MOMedia | null = null;
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
      case 'mo_media':
        moMedia = eventBody as MOMedia;
        if (moMedia.received_at) {
          moMedia.received_at = new Date(moMedia.received_at);
        }
        if (moMedia.sent_at) {
          moMedia.sent_at = new Date(moMedia.sent_at);
        }
        return moMedia;
      default:
        throw new Error(`Unknown SMS event type: ${eventBody.type}`);
      }
    }
    throw new Error(`Unknown SMS event: ${JSON.stringify(eventBody)}`);
  };

}


