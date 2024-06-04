import { FaxEventFormData, FaxEventJson } from '../base-fax-event';
import { FaxBase64FileType } from '../../enums';

export type FaxCompletedEvent = FaxCompletedEventJson | FaxCompletedEventFormData;

export interface FaxCompletedEventJson extends FaxEventJson {
  /** Always FAX_COMPLETED for this event. */
  event?: 'FAX_COMPLETED';
  /** The base64 encoded file. */
  file?: string;
  /** The file type of the attached file. */
  fileType?: FaxBase64FileType;
}

export interface FaxCompletedEventFormData extends FaxEventFormData {
  /** Always FAX_COMPLETED for this event. */
  event?: 'FAX_COMPLETED';
}
