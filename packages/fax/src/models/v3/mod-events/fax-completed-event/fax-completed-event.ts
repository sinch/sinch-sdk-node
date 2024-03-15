import { FaxBase64File } from '../../fax-base64-file';
import { FaxEventFormData, FaxEventJson } from '../base-fax-event';

export type FaxCompletedEvent = FaxCompletedEventJson | FaxCompletedEventFormData;

export interface FaxCompletedEventJson extends FaxEventJson {
  /** Always FAX_COMPLETED for this event. */
  event?: 'FAX_COMPLETED';
  /** */
  files?: FaxBase64File[];
}

export interface FaxCompletedEventFormData extends FaxEventFormData {
  /** Always FAX_COMPLETED for this event. */
  event?: 'FAX_COMPLETED';
}
