import { CallBehaviors } from '../call-behaviors';

/**
 * Request body for updating an existing voice service. Only the fields provided will be modified;
 * omitted fields remain unchanged.
 */
export interface UpdateService {
  /** Voice service name. No leading or trailing whitespaces allowed. */
  name?: string;
  /** Description of the service */
  description?: string;
  /**
   * Set `true` to make this the project default. Omit to leave unchanged.
   * `false` is rejected by the API with BadRequest — promote a different service instead.
   */
  isDefault?: true;
  /** @see CallBehaviors */
  callBehavior?: CallBehaviors;
}
