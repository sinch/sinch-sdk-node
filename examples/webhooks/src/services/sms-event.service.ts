import { Injectable } from '@nestjs/common';
import { Sms, SmsCallback } from '@sinch/sdk-core';

@Injectable()
export class SmsEventService {

  handleEvent(event: SmsCallback): void {
    console.log(`:: INCOMING EVENT :: ${event.type}`);
    if (event.type === 'delivery_report_sms' || event.type === 'delivery_report_mms') {
      return this.handleDeliveryReportEvent(event as Sms.DeliveryReport);
    } else if (event.type === 'recipient_delivery_report_sms' || event.type === 'recipient_delivery_report_mms') {
      return this.handleRecipientDeliveryReportEvent(event as Sms.RecipientDeliveryReport);
    } else if (event.type === 'mo_text') {
      return this.handleSmsEvent(event as Sms.MOText);
    } else if (event.type === 'mo_binary') {
      return this.handleMmsEvent(event as Sms.MOBinary);
    } else {
      throw new Error(`Unexpected event: ${JSON.stringify(event)}`);
    }
  }

  private handleDeliveryReportEvent(event: Sms.DeliveryReport): void {
    console.log(`The batch ${event.batch_id} has the following statuses:\n${event.statuses.map((status) => ' - \'' + status.status + '\' for the recipients: ' + status.recipients?.join(', ')).join('\n')} `);
  }

  private handleRecipientDeliveryReportEvent(event: Sms.RecipientDeliveryReport): void {
    console.log(`The batch ${event.batch_id} has the status "${event.status}" (code: ${event.code}) for the recipient ${event.recipient}`);
  }

  private handleSmsEvent(event: Sms.MOText): void {
    console.log(`A SMS sent by ${event.from} has been received by ${event.to} at ${event.received_at}. The content is:\n"${event.body}"`);
  }

  private handleMmsEvent(event: Sms.MOBinary): void {
    console.log(`A MMS sent by ${event.from} has been received by ${event.to} at ${event.received_at}.`);
  }
}
