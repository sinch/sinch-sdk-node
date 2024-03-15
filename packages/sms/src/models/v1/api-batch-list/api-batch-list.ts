import { SendSMSResponse } from '../send-sms-response';

export interface ApiBatchList {

  /** The total number of entries matching the given filters. */
  count?: number;
  /** The requested page. */
  page?: number;
  /** The page of batches matching the given filters. */
  batches?: SendSMSResponse[];
  /** The number of entries returned in this request. */
  page_size?: number;
}
