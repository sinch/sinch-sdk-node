import { InvalidArgumentError } from '../invalid-argument-error';

export interface InvalidArgument {
  /** @see InvalidArgumentError */
  error?: InvalidArgumentError;
}
