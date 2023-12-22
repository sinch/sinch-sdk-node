import { ApiClientOptions, SigningRequest } from '@sinch/sdk-client';
import {
  ConferenceCalloutsRequestData,
  ConferencesApi,
  ConferencesApiFixture,
  GetCalloutResponseObj,
  GetConferenceInfoRequestData,
  GetConferenceInfoResponse,
  KickConferenceAllRequestData,
  KickConferenceParticipantRequestData, ManageConferenceParticipantRequestData,
} from '../../../../src';


describe('ConferencesApi', () => {
  let conferencesApi: ConferencesApi;
  let fixture: ConferencesApiFixture;
  let apiClientOptions: ApiClientOptions;

  beforeEach(() => {
    fixture = new ConferencesApiFixture();
    apiClientOptions = {
      requestPlugins: [new SigningRequest('keyId', 'keySecret')],
    };
    conferencesApi = new ConferencesApi(apiClientOptions);
  });

  describe ('getConferenceInfo', () => {
    it('should make a GET request to ...', async () => {
      // Given
      const requestData: GetConferenceInfoRequestData = {
        conferenceId: 'conferenceId',
      };
      const expectedResponse: GetConferenceInfoResponse = {
        participants: [
          {
            cli: '+46708168731',
            id: 'myConfId',
            duration: 14,
            muted: false,
            onhold: false,
          },
          {
            cli: 'myUserName',
            id: 'myConfId2',
            duration: 12,
            muted: false,
            onhold: false,
          },
        ],
      };

      // When
      fixture.getConferenceInfo.mockResolvedValue(expectedResponse);
      conferencesApi.getConferenceInfo = fixture.getConferenceInfo;
      const response = await conferencesApi.getConferenceInfo(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.getConferenceInfo).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('kickConferenceAll', () => {
    it('should make a DELETE request to remove all participants from a conference', async () => {
      // Given
      const requestData: KickConferenceAllRequestData = {
        conferenceId: 'conferenceId',
      };

      // When
      fixture.kickConferenceAll.mockResolvedValue();
      conferencesApi.kickConferenceAll = fixture.kickConferenceAll;
      const response = await conferencesApi.kickConferenceAll(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.kickConferenceAll).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('kickConferenceParticipant', () => {
    it('should make a DELETE request to remove the specified participant from a conference', async () => {
      // Given
      const requestData: KickConferenceParticipantRequestData = {
        conferenceId: 'conferenceId',
        callId: 'callId',
      };

      // When
      fixture.kickConferenceParticipant.mockResolvedValue();
      conferencesApi.kickConferenceParticipant = fixture.kickConferenceParticipant;
      const response = await conferencesApi.kickConferenceParticipant(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.kickConferenceParticipant).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('manageConferenceParticipant', () => {
    it('should make a PATCH request to manage a conference participant', async () => {
      // Given
      const requestData: ManageConferenceParticipantRequestData = {
        callId: 'callId',
        conferenceId: 'conferenceId',
        manageConferenceParticipantRequestBody: {
          command: 'mute',
          moh: 'ring',
        },
      };

      // When
      fixture.manageConferenceParticipant.mockResolvedValue();
      conferencesApi.manageConferenceParticipant = fixture.manageConferenceParticipant;
      const response = await conferencesApi.manageConferenceParticipant(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.manageConferenceParticipant).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('callouts', () => {
    it('should make a POST request to make a call out to a phone number', async () => {
      // Given
      const requestData: ConferenceCalloutsRequestData = {
        calloutRequestBody: {
          method: 'ttsCallout',
          ttsCallout: {
            cli: '+14045001000',
            destination: {
              type: 'number',
              endpoint: '+14045005000',
            },
            locale: 'en-US',
            text: 'Hello, this is a call from Sinch.',
          },
        },
      };
      const expectedResponse: GetCalloutResponseObj = {
        callId: 'adf92089-df2a-4f14-a377-1e975f588fe4',
      };

      // When
      fixture.callouts.mockResolvedValue(expectedResponse);
      conferencesApi.callouts = fixture.callouts;
      const response = await conferencesApi.callouts(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.callouts).toHaveBeenCalledWith(requestData);
    });
  });
});
