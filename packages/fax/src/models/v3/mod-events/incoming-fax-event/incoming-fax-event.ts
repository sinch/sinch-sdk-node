import { FaxEventFormData, FaxEventJson } from '../base-fax-event';
import { FaxBase64FileType } from '../../enums';

export type IncomingFaxEvent = IncomingFaxEventJson | IncomingFaxEventFormData;

export interface IncomingFaxEventJson extends FaxEventJson {
  /** Always INCOMING_FAX for this event. */
  event?: 'INCOMING_FAX';
  /** The base64 encoded file. */
  file?: string;
  /** The file type of the attached file. */
  fileType?: FaxBase64FileType;
}

export interface IncomingFaxEventFormData extends FaxEventFormData {
  /** Always INCOMING_FAX for this event. */
  event?: 'INCOMING_FAX';
}
