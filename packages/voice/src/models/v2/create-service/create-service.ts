import { CallBehaviors } from '../call-behaviors';

/**
 * Request body for creating a new voice service.
 */
export interface CreateService {
  /** Voice service name. No leading or trailing whitespaces allowed. */
  name: string;
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
