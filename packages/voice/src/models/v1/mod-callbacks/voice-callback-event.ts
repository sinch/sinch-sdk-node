import { IceRequest } from './ice-request';
import { AceRequest } from './ace-request';
import { DiceRequest } from './dice-request';
import { PieRequest } from './pie-request';
import { NotifyRequest } from './notify-request';

export type VoiceCallbackEvent = IceRequest | AceRequest | DiceRequest | PieRequest | NotifyRequest;
