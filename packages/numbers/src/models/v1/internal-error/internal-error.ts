import { InternalErrorError } from '../internal-error-error';

export interface InternalError {
  /** @see InternalErrorError */
  error?: InternalErrorError;
}
