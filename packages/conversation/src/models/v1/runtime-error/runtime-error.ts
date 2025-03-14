import { ErrorDetail } from '../error-detail';

export interface RuntimeError {
  error? : RuntimeErrorContent;
}

export interface RuntimeErrorContent {
  code?: number;
  /** List of error details */
  details?: ErrorDetail[];
  message?: string;
  status?: string;
}
