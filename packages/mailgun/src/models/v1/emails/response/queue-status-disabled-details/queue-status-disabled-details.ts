export type QueueStatusDisabledDetails = Omit<QueueStatusDisabledDetailsFromApi, never>;

export interface QueueStatusDisabledDetailsFromApi {
  'reason': string;
  'until': string;
}
