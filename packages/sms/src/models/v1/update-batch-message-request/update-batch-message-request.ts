import { ApiUpdateBinaryMtMessage } from '../api-update-binary-mt-message';
import { ApiUpdateMmsMtMessage } from '../api-update-mms-mt-message';
import { ApiUpdateTextMtMessage } from '../api-update-text-mt-message';

export type UpdateBatchMessageRequest = ApiUpdateTextMtMessage | ApiUpdateBinaryMtMessage | ApiUpdateMmsMtMessage;
