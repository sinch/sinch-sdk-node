import { SinchClientParameters } from '@sinch/sdk-client';
import {
  ContactApi,
  ContactApiFixture,
  Conversation,
} from '../../../../src';
import { recipientChannelIdentities, recipientContactId } from '../mocks';

describe('ContactApi', () => {
  let contactApi: ContactApi;
  let fixture: ContactApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new ContactApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    contactApi = new ContactApi(credentials);
  });


  describe ('createContact', () => {
    it('should make a POST request to create a contact manually', async () => {
      // Given
      const requestData: Conversation.CreateContactRequestData = {
        contactCreateRequestBody: {
          channel_identities: [
            {
              identity: 'Whatsapp identity',
              channel: 'WHATSAPP',
            },
          ],
          language: 'EN_US',
          display_name: 'A contact',
        },
      };
      const expectedResponse: Conversation.Contact = {
        id: 'contact_id',
        language: 'EN_US',
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      contactApi.create = fixture.create;
      const response = await contactApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteContact', () => {
    it('should make a DELETE request to delete a contact as specified by the contact ID', async () => {
      // Given
      const requestData: Conversation.DeleteContactRequestData = {
        contact_id: 'contact_id',
      };
      const expectedResponse: any = {};

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      contactApi.delete = fixture.delete;
      const response = await contactApi.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getChannelProfile', () => {
    // Given
    const getChannelProfileRequest: Omit<Conversation.GetChannelProfileRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      channel: 'MESSENGER',
    };
    const requestDataWithContactId: Conversation.GetChannelProfileRequestData<Conversation.ContactId> = {
      getChannelProfileRequestBody: {
        ...getChannelProfileRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.GetChannelProfileRequestData<Conversation.IdentifiedBy> = {
      getChannelProfileRequestBody: {
        ...getChannelProfileRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.GetChannelProfileResponse = {
      profile_name: 'Profile Name',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
    ])('should make a POST request to get a user profile from a specific channel for a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.getChannelProfile.mockResolvedValue(expectedResponse);
        contactApi.getChannelProfile = fixture.getChannelProfile;
        const response = await contactApi.getChannelProfile(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.getChannelProfile).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('getContact', () => {
    it('should make a GET request to retrieve a specific contact as specified by the contact ID', async () => {
      // Given
      const requestData: Conversation.GetContactRequestData = {
        contact_id: 'contact_id',
      };
      const expectedResponse: Conversation.Contact = {
        id: 'contact_id',
        language: 'EN_US',
        channel_priority: ['WHATSAPP'],
        email: 'mail@mail.com',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      contactApi.get = fixture.get;
      const response = await contactApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listContacts', () => {
    it('should make a GET request to list all contacts in the project', async () => {
      // Given
      const requestData: Conversation.ListContactsRequestData = {};
      const mockData: Conversation.Contact[] = [
        {
          id: 'contact_id',
        },
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.list.mockResolvedValue(expectedResponse);
      contactApi.list = fixture.list;
      const response = await contactApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('mergeContact', () => {
    it('should make a POST request to merge two contacts', async () => {
      // Given
      const requestData: Conversation.MergeContactRequestData = {
        destination_id: 'contact_id',
        mergeContactRequestBody: {
          source_id: 'to_be_removed_contact_id',
          strategy: 'MERGE',
        },
      };
      const expectedResponse: Conversation.Contact = {
        id: 'contact_id',
      };

      // When
      fixture.mergeContact.mockResolvedValue(expectedResponse);
      contactApi.mergeContact = fixture.mergeContact;
      const response = await contactApi.mergeContact(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.mergeContact).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateContact', () => {
    it('should make a PATCH request to update a contact as specified by the contact ID', async () => {
      // Given
      const requestData: Conversation.UpdateContactRequestData = {
        contact_id: 'contact_id',
        updateContactRequestBody: {
          language: 'EN_GB',
        },
      };
      const expectedResponse: Conversation.Contact = {
        id: 'contact_id',
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      contactApi.update = fixture.update;
      const response = await contactApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
