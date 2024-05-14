import { FieldViolation } from '../field-violation';

export interface BadRequest {
  /** @see TypeEnum */
  type?: TypeEnum;
  /** List of FieldViolations */
  fieldViolations?: FieldViolation[];
}

export type TypeEnum = 'BadRequest';
