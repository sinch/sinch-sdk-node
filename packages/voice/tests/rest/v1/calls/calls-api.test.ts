import { ApiClientOptions, SigningRequest } from '@sinch/sdk-client';
import {
  CallsApi,
  CallsApiFixture,
  GetCallResponseObj,
  GetCallResultRequestData,
  ManageCallWithCallLegRequestData,
  SvamlAction,
  SvamlActionHangup,
  SvamlInstruction,
  SvamlInstructionSay,
  SvamlInstructionSendDtmf,
  UpdateCallRequestData,
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
      const requestData: GetCallResultRequestData = {
        callId: 'callId',
      };
      const expectedResponse: GetCallResponseObj = {
        callId: 'callId',
        from: '33444555666',
        to: '33777888999',
        domain: 'pstn',
        duration: 30,
        result: 'ANSWERED',
        reason: 'CALLERHANGUP',
        timestamp: new Date(),
      };

      // When
      fixture.getCallResult.mockResolvedValue(expectedResponse);
      callsApi.getCallResult = fixture.getCallResult;
      const response = await callsApi.getCallResult(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.getCallResult).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('manageCallWithCallLeg', () => {
    it('should make a PATCH request to manage calls', async () => {
      // Given
      const instruction: SvamlInstruction = {
        name: 'say',
        text: 'Hello, the call is over, hanging up now. Goodbye',
        locale: 'en-US',
      } as SvamlInstructionSay;
      const action: SvamlAction = {
        name: 'hangup',
      } as SvamlActionHangup;
      const requestData: ManageCallWithCallLegRequestData = {
        callId: 'callId',
        callLeg: 'caller',
        svamlRequestBody: {
          instructions: [
            instruction,
          ],
          action,
        },
      };

      // When
      fixture.manageCallWithCallLeg.mockResolvedValue();
      callsApi.manageCallWithCallLeg = fixture.manageCallWithCallLeg;
      const response = await callsApi.manageCallWithCallLeg(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.manageCallWithCallLeg).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateCall', () => {
    it('should make a PATCH request to manage a call in progress', async () => {
      // Given
      const instruction: SvamlInstruction = {
        name: 'sendDtmf',
        value: '1234#',
      } as SvamlInstructionSendDtmf;
      const action: SvamlAction = {
        name: 'hangup',
      } as SvamlActionHangup;
      const requestData: UpdateCallRequestData = {
        callId: 'callId',
        svamlRequestBody: {
          instructions: [
            instruction,
          ],
          action,
        },
      };

      // When
      fixture.updateCall.mockResolvedValue();
      callsApi.updateCall = fixture.updateCall;
      const response = await callsApi.updateCall(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.updateCall).toHaveBeenCalledWith(requestData);
    });
  });
});
