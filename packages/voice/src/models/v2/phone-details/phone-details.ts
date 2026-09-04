export interface PhoneDetails {
  /** E.164 Phone number */
  number: string;
}
/** Validation regex for number */
export const numberPattern = /^\+[1-9]\d{1,14}$/;
