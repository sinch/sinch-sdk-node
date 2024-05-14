import { BadRequest } from '../bad-request';

export interface InvalidArgumentError {
  /** @see CodeEnum */
  code?: CodeEnum;
  message?: string;
  /** @see StatusEnum */
  status?: StatusEnum;
  /** List of BadRequests */
  details?: BadRequest[];
}

export type CodeEnum = '400';
export type StatusEnum = 'INVALID_ARGUMENT';
