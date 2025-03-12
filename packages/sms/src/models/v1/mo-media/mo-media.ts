import { MmsMoBody } from '../mms-mo-body';
import { ApiMoMessage } from '../api-mo-message';

export interface MOMedia extends ApiMoMessage {
  /** MMS */
  type: 'mo_media';
  /** @see MmsMoBody */
  body: MmsMoBody;
}
