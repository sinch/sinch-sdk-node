import { CallbackProcessor } from '@sinch/sdk-client';
import { IncomingHttpHeaders } from 'http';
import { Fax, FaxCompletedEvent, IncomingFaxEvent } from '../../../models';

export type FaxWebhookEventParsed = IncomingFaxEvent | FaxCompletedEvent;

export class FaxCallbackWebhooks implements CallbackProcessor<FaxWebhookEventParsed> {

  /**
   * Reviver for a Fax Event
   * This method ensures the object can be treated as a Fax Event and should be called before any action is taken to manipulate the object.
   * @param {any} eventBody - the event body or form containing the Fax event notification.
   * @return {FaxWebhookEventParsed} - The parsed Fax event object
   */
  public parseEvent(eventBody: any): FaxWebhookEventParsed {
    let incomingFaxEvent: IncomingFaxEvent | null = null;
    let faxCompletedEvent: FaxCompletedEvent | null = null;
    if (eventBody.event) {
      switch (eventBody.event) {
      case 'INCOMING_FAX':
        incomingFaxEvent = eventBody as IncomingFaxEvent;
        if (eventBody.eventTime) {
          incomingFaxEvent.eventTime = new Date(eventBody.eventTime);
        }
        // In case of multipart/form-data, the server may not have parsed the 'fax' property as a JSON object, so we do it here
        if (typeof eventBody.fax === 'string') {
          incomingFaxEvent.fax = this.reviveFax(eventBody.fax);
        }
        return incomingFaxEvent;
      case 'FAX_COMPLETED':
        faxCompletedEvent = eventBody as FaxCompletedEvent;
        if (faxCompletedEvent.eventTime) {
          faxCompletedEvent.eventTime = new Date(faxCompletedEvent.eventTime);
        }
        // In case of multipart/form-data, the server may not have parsed the 'fax' property as a JSON object, so we do it here
        if (typeof eventBody.fax === 'string') {
          faxCompletedEvent.fax = this.reviveFax(eventBody.fax);
        }
        return faxCompletedEvent;
      default:
        throw new Error(`Unknown Fax event: ${eventBody.event}`);
      }
    }
    console.log(eventBody);
    throw new Error('Unknown Fax event');
  }

  private reviveFax(faxAsString: string): Fax {
    const fax: Fax = JSON.parse(faxAsString);
    if (fax.createTime) {
      fax.createTime = new Date(fax.createTime);
    }
    if (fax.completedTime) {
      fax.completedTime = new Date(fax.completedTime);
    }
    return fax;
  }

  public validateAuthenticationHeader(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _headers: IncomingHttpHeaders, _body: any, _path: string, _method: string): boolean {
    // No header validation is implemented for Fax API
    return true;
  }

}
