import { AddKeyword } from '../add-keyword';
import { RemoveKeyword } from '../remove-keyword';

export interface GroupAutoUpdate {
  /** Short code or long number addressed in [MO](https://support.sinch.com/hc/en-us/articles/52307687024659-MO-Mobile-Originated).  Constraints:  Must be valid phone number or short code which has been **provisioned by your account manager**. */
  to: string;
  /** @see AddKeyword */
  add?: AddKeyword;
  /** @see RemoveKeyword */
  remove?: RemoveKeyword;
}
