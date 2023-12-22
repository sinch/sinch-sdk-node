import { CallbackPayload } from '../../../models';

export const parseEventNotification = (eventBody: any): CallbackPayload => {
  // There is a bug in the API which doesn't send the timezone along with the timestamp
  // As the server formats the timestamp as GMT, we check if the timezone is missing and add it if needed
  const timestamp = eventBody.timestamp;
  const timeZoneRegex = /([+-]\d{2}:?\d{2}|Z)$/;
  if (!timeZoneRegex.test(timestamp)) {
    eventBody.timestamp = timestamp + 'Z';
  }
  if (eventBody.timestamp) {
    eventBody.timestamp = new Date(eventBody.timestamp);
  }
  return eventBody as CallbackPayload;
};
