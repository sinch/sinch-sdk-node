export interface QueueStatusDisabledDetails {
  /** End date in RFC822 date format */
  until: string;
  /** Cause description */
  reason: string;
}

export interface QueueStatusDisabledDetailsFromApi {
  /** End date in RFC822 date format */
  until: string;
  /** Cause description */
  reason: string;
}
