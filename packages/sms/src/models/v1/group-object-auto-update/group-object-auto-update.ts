/**
 * Model: GroupObjectAutoUpdate
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { GroupObjectAutoUpdateRemove } from '../group-object-auto-update-remove';
import { UpdateGroupRequestAutoUpdateAdd } from '../update-group-request-auto-update-add';

export interface GroupObjectAutoUpdate {

  /** Short code or long number addressed in <a href=\"https://community.sinch.com/t5/Glossary/MO-Mobile-Originated/ta-p/7618\" target=\"_blank\">MO</a>.  Constraints: Must be valid phone number or short code. */
  to?: string;
  /** @see UpdateGroupRequestAutoUpdateAdd */
  add?: UpdateGroupRequestAutoUpdateAdd;
  /** @see GroupObjectAutoUpdateRemove */
  remove?: GroupObjectAutoUpdateRemove;
}


