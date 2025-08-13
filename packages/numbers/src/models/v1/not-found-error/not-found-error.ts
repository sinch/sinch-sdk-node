import { NotFoundErrorDetails } from '../not-found-error-details';

export interface NotFoundError {
  /** @see CodeEnum */
  code?: CodeEnum;
  message?: string;
  /** @see StatusEnum */
  status?: StatusEnum;
  /** List of objects */
  details?: NotFoundErrorDetails[];
}

export type CodeEnum = '404';
export type StatusEnum = 'NOT_FOUND';
