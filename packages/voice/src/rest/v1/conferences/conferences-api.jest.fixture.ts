import {
  GetCalloutResponseObj,
  GetConferenceInfoResponse,
} from '../../../models';
import {
  ConferenceCalloutsRequestData,
  ConferencesApi,
  GetConferenceInfoRequestData,
  KickConferenceAllRequestData,
  KickConferenceParticipantRequestData,
  ManageConferenceParticipantRequestData,
} from './conferences-api';

export class ConferencesApiFixture implements Partial<Readonly<ConferencesApi>> {

  /**
   * Fixture associated to function getConferenceInfo
   */
  public getConferenceInfo: jest.Mock<Promise<GetConferenceInfoResponse>, [GetConferenceInfoRequestData]> = jest.fn();
  /**
   * Fixture associated to function kickConferenceAll
   */
  public kickConferenceAll: jest.Mock<Promise<void>, [KickConferenceAllRequestData]> = jest.fn();
  /**
   * Fixture associated to function kickConferenceParticipant
   */
  public kickConferenceParticipant: jest.Mock<Promise<void>, [KickConferenceParticipantRequestData]> = jest.fn();
  /**
   * Fixture associated to function manageConferenceParticipant
   */
  public manageConferenceParticipant: jest.Mock<Promise<void>, [ManageConferenceParticipantRequestData]> = jest.fn();
  /**
   * Fixture associated to function callouts
   */
  public callouts: jest.Mock<Promise<GetCalloutResponseObj>, [ConferenceCalloutsRequestData]> = jest.fn();
}

