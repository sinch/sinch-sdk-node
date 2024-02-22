import { CalloutResponse } from '../../../models';
import {
  CalloutsApi,
  ConferenceCalloutRequestData,
  CustomCalloutRequestData,
  TtsCalloutRequestData,
} from './callouts-api';

export class CalloutsApiFixture implements Partial<Readonly<CalloutsApi>> {

  /**
   * Fixture associated to function tts
   */
  public tts: jest.Mock<Promise<CalloutResponse>, [TtsCalloutRequestData]> = jest.fn();

  /**
   * Fixture associated to function tts
   */
  public conference: jest.Mock<Promise<CalloutResponse>, [ConferenceCalloutRequestData]> = jest.fn();

  /**
   * Fixture associated to function tts
   */
  public custom: jest.Mock<Promise<CalloutResponse>, [CustomCalloutRequestData]> = jest.fn();
}

