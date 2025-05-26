import { MmsMedia } from '../mms-media';

/**
 * The message content, including a URL to the media filters.
 */
export interface MmsMoBody {
  /** The subject of the MMS media message. */
  subject?: string;
  /** The text message content of the MMS media message. */
  message?: string;
  /** List of MmsMedias */
  media?: MmsMedia[];
}
