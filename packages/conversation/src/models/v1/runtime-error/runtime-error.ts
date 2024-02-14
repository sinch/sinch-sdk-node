import { ErrorDetail } from '../error-detail';

export interface RuntimeError {

  code?: number;
  /** List of error details */
  details?: ErrorDetail[];
  error?: string;
  message?: string;
  status?: string;
}
