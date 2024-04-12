import { TranscodeMessageRequest } from '../../transcode-message-request';

export interface TranscodeMessageRequestData {
  /** The message to be transcoded, and the app and channels for which the message is to be transcoded. */
  'transcodeMessageRequestBody': TranscodeMessageRequest;
}
