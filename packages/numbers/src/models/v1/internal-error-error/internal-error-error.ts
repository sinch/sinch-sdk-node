/**
 * Model: InternalErrorError
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

export interface InternalErrorError {
  /** @see CodeEnum */
  code?: CodeEnum;
  message?: string;
  /** @see StatusEnum */
  status?: StatusEnum;
  /** List of objects */
  details?: object[];
}

export type CodeEnum = '500';
export type StatusEnum = 'INTERNAL' | 'UNKNOWN';
