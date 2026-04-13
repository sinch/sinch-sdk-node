import { CallbackProcessor } from '@sinch/sdk-client';
import { IncomingHttpHeaders } from 'http';
import { Fax, FaxCompletedEvent, FaxWebhookEventParsed, IncomingFaxEvent } from '../../../models';

export class FaxCallbackWebhooks implements CallbackProcessor<FaxWebhookEventParsed> {

  /**
   * Reviver for a Fax Event
   * This method ensures the object can be treated as a Fax Event and should be called before any action is taken to manipulate the object.
   * @param {any} eventBody - the event body or form containing the Fax event notification.
   *   Accepted formats:
   *   - A JSON string (application/json content type)
   *   - A multipart/form-data raw body string (fields will be extracted automatically)
   *   - An already-parsed object
   * @return {FaxWebhookEventParsed} - The parsed Fax event object
   */
  public parseEvent(eventBody: any): FaxWebhookEventParsed {
    if (typeof eventBody === 'string') {
      if (eventBody.trimStart().startsWith('--')) {
        eventBody = this.parseMultipartFormData(eventBody);
      } else {
        eventBody = JSON.parse(eventBody);
      }
    }
    let incomingFaxEvent: IncomingFaxEvent | null = null;
    let faxCompletedEvent: FaxCompletedEvent | null = null;
    if (eventBody.event) {
      switch (eventBody.event) {
        case 'INCOMING_FAX':
          incomingFaxEvent = eventBody as IncomingFaxEvent;
          if (eventBody.eventTime) {
            incomingFaxEvent.eventTime = new Date(eventBody.eventTime);
          }
          if (eventBody.fax) {
            incomingFaxEvent.fax = this.reviveFax(eventBody.fax);
          }
          return incomingFaxEvent;
        case 'FAX_COMPLETED':
          faxCompletedEvent = eventBody as FaxCompletedEvent;
          if (faxCompletedEvent.eventTime) {
            faxCompletedEvent.eventTime = new Date(faxCompletedEvent.eventTime);
          }
          if (eventBody.fax) {
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

  /**
   * Parses a raw multipart/form-data body string into a key-value object.
   * The boundary is detected from the first line of the body.
   * @param {string} body - The raw multipart/form-data body string.
   * @return {Record<string, string>} - An object with field names as keys and field values as strings.
   */
  private parseMultipartFormData(body: string): Record<string, string> {
    const result: Record<string, string> = {};
    // The first line is the boundary delimiter (e.g. "--<boundary>")
    const boundaryMatch = body.match(/^(--[^\r\n]+)/);
    if (!boundaryMatch) {
      throw new Error('Unable to detect multipart boundary from the body');
    }
    const boundary = boundaryMatch[1];
    // Split the body by the boundary; the first part is empty and the last ends with "--"
    const parts = body.split(boundary).filter((part) => part && part.trim() !== '--' && part.trim() !== '');
    for (const part of parts) {
      const nameMatch = part.match(/Content-Disposition:\s*form-data;\s*name="([^"]+)"/i);
      if (!nameMatch) {continue;}
      const fieldName = nameMatch[1];
      // The value comes after the first blank line (header/body separator)
      const headerBodySeparator = part.indexOf('\r\n\r\n') !== -1 ? '\r\n\r\n' : '\n\n';
      const separatorIndex = part.indexOf(headerBodySeparator);
      if (separatorIndex === -1) {continue;}
      let value = part.substring(separatorIndex + headerBodySeparator.length);
      // Remove trailing boundary markers: a closing boundary (--boundary--) may remain
      // if its dash count differs slightly from the opening boundary
      const trailingBoundaryIndex = value.search(/\r?\n--[-]+[^\r\n]*--\s*$/);
      if (trailingBoundaryIndex !== -1) {
        value = value.substring(0, trailingBoundaryIndex);
      }
      value = value.replace(/\r?\n$/, ''); // Trim trailing newline
      result[fieldName] = value;
    }
    return result;
  }

  private reviveFax(faxInput: string | Fax): Fax {
    const fax: Fax = typeof faxInput === 'string' ? JSON.parse(faxInput) : faxInput;
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

  /**
   * Static reviver for a Fax Event.
   * This method ensures the object can be treated as a Fax Event.
   * @param {any} eventBody - The event body containing the Fax event notification.
   * @return {FaxWebhookEventParsed} - The parsed Fax event object
   */
  public static parseEvent(eventBody:any): FaxWebhookEventParsed {
    const instance = new FaxCallbackWebhooks();
    return instance.parseEvent(eventBody);
  }

}
