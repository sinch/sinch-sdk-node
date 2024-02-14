import { TranscodeMessageResponse } from '../../../models';
import { TranscodingApi, TranscodeMessageRequestData } from './transcoding-api';

export class TranscodingApiFixture implements Partial<Readonly<TranscodingApi>> {

  /**
   * Fixture associated to function transcodeMessage
   */
  public transcodeMessage: jest.Mock<Promise<TranscodeMessageResponse>, [TranscodeMessageRequestData]> = jest.fn();
}

