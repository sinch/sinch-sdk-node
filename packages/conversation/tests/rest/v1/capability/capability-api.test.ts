import { SinchClientParameters } from '@sinch/sdk-client';
import {
  ContactId,
  IdentifiedBy,
  LookupCapabilityRequest,
  LookupCapabilityRequestData,
  LookupCapabilityResponse,
  Recipient,
} from '../../../../src';
import { CapabilityApi, CapabilityApiFixture } from '../../../../src';
import { recipientChannelIdentities, recipientContactId } from '../mocks';

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
    // Given
    const lookupCapabilityRequest: Omit<LookupCapabilityRequest<Recipient>, 'recipient'> = {
      app_id: 'app_id',
    };
    const requestDataWithContactId: LookupCapabilityRequestData<ContactId> = {
      lookupCapabilityRequestBody: {
        ...lookupCapabilityRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: LookupCapabilityRequestData<IdentifiedBy> = {
      lookupCapabilityRequestBody: {
        ...lookupCapabilityRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: LookupCapabilityResponse = {
      app_id: 'app_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
    ])('should make a POST request to trigger a CAPABILITY event for a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.lookup.mockResolvedValue(expectedResponse);
        capabilityApi.lookup = fixture.lookup;
        const response = await capabilityApi.lookup(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.lookup).toHaveBeenCalledWith(requestData);
      });
  });
});
