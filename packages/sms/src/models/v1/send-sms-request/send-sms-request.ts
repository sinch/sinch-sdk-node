import { BinaryRequest } from '../binary-request';
import { MediaRequest } from '../media-request';
import { TextRequest } from '../text-request';

export type SendSMSRequest = TextRequest | BinaryRequest | MediaRequest;
