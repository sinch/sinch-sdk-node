import { VerificationRequestEvent, VerificationResultEvent } from '../../../models';

export type VerificationCallback = VerificationRequestEvent | VerificationResultEvent;

export const parseVerificationEventNotification = (eventBody: any): VerificationCallback => {
  if (eventBody.event) {
    switch (eventBody.event) {
    case 'VerificationRequestEvent':
      return eventBody as VerificationRequestEvent;
    case 'VerificationResultEvent':
      return eventBody as VerificationResultEvent;
    default:
      throw new Error(`Unknown Verification event type: ${eventBody.event}`);
    }
  }
  console.log(eventBody);
  throw new Error('Unknown Verification event');
};
