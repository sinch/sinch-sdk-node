export interface CallHeadersInner {
  /** Name of the header. */
  key: string;
  /** Value of the header. */
  value?: string;
}
/** Validation regex for key */
export const keyPattern = /^[\x20-\x7e\t]+$/;
/** Validation regex for value */
export const valuePattern = /^[\x20-\x7e\t]*$/;
