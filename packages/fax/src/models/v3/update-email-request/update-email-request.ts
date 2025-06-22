import { NumberWithPermissions } from '../number-with-permissions';

export interface UpdateEmailRequest {
  /** List of numbers */
  phoneNumbers: NumberWithPermissions[];
}
