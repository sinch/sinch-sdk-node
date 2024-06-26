import { ConferencesApi } from './conferences-api';
import {
  CalloutResponse,
  ConferenceCalloutRequestData,
  GetConferenceInfoResponse,
  GetConferenceInfoRequestData,
  KickAllRequestData,
  KickParticipantRequestData,
  ManageParticipantRequestData,
} from '../../../models';

export class ConferencesApiFixture implements Partial<Readonly<ConferencesApi>> {

  /**
   * Fixture associated to function call
   */
  public call: jest.Mock<Promise<CalloutResponse>, [ConferenceCalloutRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<GetConferenceInfoResponse>, [GetConferenceInfoRequestData]> = jest.fn();
  /**
   * Fixture associated to function kickAll
   */
  public kickAll: jest.Mock<Promise<void>, [KickAllRequestData]> = jest.fn();
  /**
   * Fixture associated to function kickParticipant
   */
  public kickParticipant: jest.Mock<Promise<void>, [KickParticipantRequestData]> = jest.fn();
  /**
   * Fixture associated to function manageParticipant
   */
  public manageParticipant: jest.Mock<Promise<void>, [ManageParticipantRequestData]> = jest.fn();
}
