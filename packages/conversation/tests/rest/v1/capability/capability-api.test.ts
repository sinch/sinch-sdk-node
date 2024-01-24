import { SinchClientParameters } from '@sinch/sdk-client';
import { QueryCapabilityRequestData, QueryCapabilityResponse } from '../../../../src';
import { CapabilityApi, CapabilityApiFixture } from '../../../../src';

describe('CapabilityApi', () => {
  let capabilityApi: CapabilityApi;
  let fixture: CapabilityApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new CapabilityApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    capabilityApi = new CapabilityApi(credentials);
  });


  describe ('queryCapability', () => {
    it('should make a POST request to ...', async () => {
      // Given
      const requestData: QueryCapabilityRequestData = {
        queryCapabilityBody: {
          app_id: 'app_id',
          recipient: {
            identified_by: {
              channel_identities: [
                {
                  identity: 'Whatsapp identity',
                  channel: 'WHATSAPP',
                },
              ],
            },
          },
        },
      };
      const expectedResponse: QueryCapabilityResponse = {
        app_id: 'app_id',
      };

      // When
      fixture.queryCapability.mockResolvedValue(expectedResponse);
      capabilityApi.queryCapability = fixture.queryCapability;
      const response = await capabilityApi.queryCapability(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.queryCapability).toHaveBeenCalledWith(requestData);
    });
  });
});
