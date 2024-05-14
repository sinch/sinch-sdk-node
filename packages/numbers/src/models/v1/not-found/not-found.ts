import { NotFoundError } from '../not-found-error';

export interface NotFound {
  /** @see NotFoundError */
  error?: NotFoundError;
}
