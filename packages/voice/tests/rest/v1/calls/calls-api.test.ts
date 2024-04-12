import { ApiClientOptions, SigningRequest } from '@sinch/sdk-client';
import {
  CallsApi,
  CallsApiFixture,
  Voice,
} from '../../../../src';

describe('CallsApi', () => {
  let callsApi: CallsApi;
  let fixture: CallsApiFixture;
  let apiClientOptions: ApiClientOptions;

  beforeEach(() => {
    fixture = new CallsApiFixture();
    apiClientOptions = {
      requestPlugins: [new SigningRequest('keyId', 'keySecret')],
    };
    callsApi = new CallsApi(apiClientOptions);
  });

  describe ('getCallResult', () => {
    it('should make a GET request to retrieve information about a call', async () => {
      // Given
      const requestData: Voice.GetCallResultRequestData = {
        callId: 'callId',
      };
      const expectedResponse: Voice.GetCallInformation = {
        callId: 'callId',
        to: {
          type: 'Number',
          endpoint: '33777888999',
        },
        domain: 'pstn',
        duration: 30,
        status: 'FINAL',
        result: 'ANSWERED',
        reason: 'CALLERHANGUP',
        timestamp: new Date(),
        userRate: {
          currencyId: 'EUR',
          amount: 0.1758,
        },
        debit: {
          currencyId: 'EUR',
          amount: 0.1758,
        },
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      callsApi.get = fixture.get;
      const response = await callsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('manageCallWithCallLeg', () => {
    it('should make a PATCH request to manage calls', async () => {
      // Given
      const instruction: Voice.SvamlInstruction = {
        name: 'say',
        text: 'Hello, the call is over, hanging up now. Goodbye',
        locale: 'en-US',
      } as Voice.SvamlInstructionSay;
      const action: Voice.SvamlAction = {
        name: 'hangup',
      } as Voice.SvamlActionHangup;
      const requestData: Voice.ManageWithCallLegRequestData = {
        callId: 'callId',
        callLeg: 'caller',
        manageWithCallLegRequestBody: {
          instructions: [
            instruction,
          ],
          action,
        },
      };

      // When
      fixture.manageWithCallLeg.mockResolvedValue();
      callsApi.manageWithCallLeg = fixture.manageWithCallLeg;
      const response = await callsApi.manageWithCallLeg(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.manageWithCallLeg).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateCall', () => {
    it('should make a PATCH request to manage a call in progress', async () => {
      // Given
      const instruction: Voice.SvamlInstruction = {
        name: 'sendDtmf',
        value: '1234#',
      } as Voice.SvamlInstructionSendDtmf;
      const action: Voice.SvamlAction = {
        name: 'hangup',
      } as Voice.SvamlActionHangup;
      const requestData: Voice.UpdateCallRequestData = {
        callId: 'callId',
        updateCallRequestBody: {
          instructions: [
            instruction,
          ],
          action,
        },
      };

      // When
      fixture.update.mockResolvedValue();
      callsApi.update = fixture.update;
      const response = await callsApi.update(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
