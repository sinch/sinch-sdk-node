import { BinaryResponse } from '../binary-response';
import { MediaResponse } from '../media-response';
import { TextResponse } from '../text-response';

export type SendSMSResponse = TextResponse | BinaryResponse | MediaResponse;

export type CancelBatchMessageResponse = SendSMSResponse;

export type ReplaceBatchMessageResponse = SendSMSResponse;
