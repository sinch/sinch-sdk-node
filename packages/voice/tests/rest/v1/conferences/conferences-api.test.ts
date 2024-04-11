import { ApiClientOptions, SigningRequest } from '@sinch/sdk-client';
import {
  ConferencesApi,
  ConferencesApiFixture,
  Voice,
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
    it('should make a GET request to get information about a conference', async () => {
      // Given
      const requestData: Voice.GetConferenceInfoRequestData = {
        conferenceId: 'conferenceId',
      };
      const expectedResponse: Voice.GetConferenceInfoResponse = {
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
      fixture.get.mockResolvedValue(expectedResponse);
      conferencesApi.get = fixture.get;
      const response = await conferencesApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('Conference callouts', () => {
    it('should make a POST request to make a conference callout to a phone number', async () => {
      // Given
      const requestData: Voice.ConferenceCalloutRequestData = {
        conferenceCalloutRequestBody: {
          method: 'conferenceCallout',
          conferenceCallout: {
            cli: '+14045001000',
            conferenceId: 'conferenceId',
            destination: {
              type: 'number',
              endpoint: '+14045005000',
            },
            domain: 'pstn',
          },
        },
      };
      const expectedResponse: Voice.CalloutResponse = {
        callId: 'callId',
      };

      // When
      fixture.call.mockResolvedValue(expectedResponse);
      conferencesApi.call = fixture.call;
      const response = await conferencesApi.call(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.call).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('kickConferenceAll', () => {
    it('should make a DELETE request to remove all participants from a conference', async () => {
      // Given
      const requestData: Voice.KickAllRequestData = {
        conferenceId: 'conferenceId',
      };

      // When
      fixture.kickAll.mockResolvedValue();
      conferencesApi.kickAll = fixture.kickAll;
      const response = await conferencesApi.kickAll(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.kickAll).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('kickConferenceParticipant', () => {
    it('should make a DELETE request to remove the specified participant from a conference', async () => {
      // Given
      const requestData: Voice.KickParticipantRequestData = {
        conferenceId: 'conferenceId',
        callId: 'callId',
      };

      // When
      fixture.kickParticipant.mockResolvedValue();
      conferencesApi.kickParticipant = fixture.kickParticipant;
      const response = await conferencesApi.kickParticipant(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.kickParticipant).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('manageConferenceParticipant', () => {
    it('should make a PATCH request to manage a conference participant', async () => {
      // Given
      const requestData: Voice.ManageParticipantRequestData = {
        callId: 'callId',
        conferenceId: 'conferenceId',
        manageParticipantRequestBody: {
          command: 'mute',
          moh: 'ring',
        },
      };

      // When
      fixture.kickParticipant.mockResolvedValue();
      conferencesApi.kickParticipant = fixture.kickParticipant;
      const response = await conferencesApi.kickParticipant(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.kickParticipant).toHaveBeenCalledWith(requestData);
    });
  });
});
