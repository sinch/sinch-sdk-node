import { AddKeyword } from '../add-keyword';
import { RemoveKeyword } from '../remove-keyword';

export interface GroupAutoUpdate {
  /** Short code or long number addressed in [MO](https://community.sinch.com/t5/Glossary/MO-Mobile-Originated/ta-p/7618).  Constraints:  Must be valid phone number or short code which has been **provisioned by your account manager**. */
  to: string;
  /** @see AddKeyword */
  add?: AddKeyword;
  /** @see RemoveKeyword */
  remove?: RemoveKeyword;
}
