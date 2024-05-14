export interface NotFoundError {
  /** @see CodeEnum */
  code?: CodeEnum;
  message?: string;
  /** @see StatusEnum */
  status?: StatusEnum;
  /** List of objects */
  details?: object[];
}

export type CodeEnum = '404';
export type StatusEnum = 'NOT_FOUND';
