export type QueueStatusDisabledDetails = Omit<QueueStatusDisabledDetailsFromApi, never>;

export interface QueueStatusDisabledDetailsFromApi {
  'reason': string;
  'until': string;
}

export const transformQueueStatusDisabledDetailsIntoClientResponse = (
  apiResponse?: QueueStatusDisabledDetailsFromApi,
): QueueStatusDisabledDetails => {
  const {
    ...response
  } = apiResponse;
  return response;
};
