import { UpdateService } from '../update-service';

/**
 * Request body for creating a new voice service. Extends the update request with `name` as a
 * required field.
 */
export interface CreateService extends UpdateService {
  /** Voice service name. No leading or trailing whitespaces allowed. */
  name: string;
}
