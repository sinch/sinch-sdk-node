import { GetCalloutResponseObj } from '../../../models';
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
  public tts: jest.Mock<Promise<GetCalloutResponseObj>, [TtsCalloutRequestData]> = jest.fn();

  /**
   * Fixture associated to function tts
   */
  public conference: jest.Mock<Promise<GetCalloutResponseObj>, [ConferenceCalloutRequestData]> = jest.fn();

  /**
   * Fixture associated to function tts
   */
  public custom: jest.Mock<Promise<GetCalloutResponseObj>, [CustomCalloutRequestData]> = jest.fn();
}

