import { UpdateGroupRequestAutoUpdateAdd } from '../update-group-request-auto-update-add';
import { UpdateGroupRequestAutoUpdateRemove } from '../update-group-request-auto-update-remove';

export interface UpdateGroupRequestAutoUpdate {

  /** Short code or long number addressed in <a href=\"https://community.sinch.com/t5/Glossary/MO-Mobile-Originated/ta-p/7618\" target=\"_blank\">MO</a>.  Constraints: Must be a valid phone number or short code. */
  to?: string;
  /** @see UpdateGroupRequestAutoUpdateAdd */
  add?: UpdateGroupRequestAutoUpdateAdd;
  /** @see UpdateGroupRequestAutoUpdateRemove */
  remove?: UpdateGroupRequestAutoUpdateRemove;
}


