import { AceRequest, DiceRequest, IceRequest, NotifyRequest, PieRequest } from '../../../models';

export type VoiceCallback = IceRequest | AceRequest | DiceRequest | PieRequest | NotifyRequest;

export const parseVoiceEventNotification = (eventBody: any): VoiceCallback =>{
  if (eventBody.event) {
    switch (eventBody.event) {
    case 'ice':
      return eventBody as IceRequest;
    case 'ace':
      return eventBody as AceRequest;
    case 'dice':
      return eventBody as DiceRequest;
    case 'pie':
      return eventBody as PieRequest;
    case 'notify':
      return eventBody as NotifyRequest;
    default:
      throw new Error(`Unknown Voice event type: ${eventBody.event}`);
    }
  }
  console.log(eventBody);
  throw new Error('Unknown Voice event');
};
