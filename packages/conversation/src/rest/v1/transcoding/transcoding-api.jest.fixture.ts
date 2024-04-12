import { TranscodingApi } from './transcoding-api';
import {
  TranscodeMessageResponse,
  TranscodeMessageRequestData,
} from '../../../models';

export class TranscodingApiFixture implements Partial<Readonly<TranscodingApi>> {

  /**
   * Fixture associated to function transcodeMessage
   */
  public transcodeMessage: jest.Mock<Promise<TranscodeMessageResponse>, [TranscodeMessageRequestData]> = jest.fn();
}
