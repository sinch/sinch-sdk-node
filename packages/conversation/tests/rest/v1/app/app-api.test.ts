import { SinchClientParameters } from '@sinch/sdk-client';
import {
  AppApi,
  AppApiFixture,
  Conversation,
} from '../../../../src';

describe('AppApi', () => {
  let appApi: AppApi;
  let fixture: AppApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new AppApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    appApi = new AppApi(credentials);
  });


  describe ('createApp', () => {
    it('should make a POST request to create a new Conversation App', async () => {
      // Given
      const channelCredentialsAppleBC: Conversation.ChannelCredentialsAppleBC = {
        channel: 'APPLEBC',
        applebc_credentials: {
          business_chat_account_id: 'apple_business_chat_account_id',
          merchant_id: 'merchant_id',
          apple_pay_certificate_reference: 'apple_pay_certificate_reference',
          apple_pay_certificate_password: 'apple_pay_certificate_password',
        },
      };
      const channelCredentialsInstagram: Conversation.ChannelCredentialsInstagram = {
        channel: 'INSTAGRAM',
        instagram_credentials: {
          token: 'instagram_channel_token',
          business_account_id: 'instagram_business_account_id',
        },
      };
      const channelCredentialsKakaoTalk: Conversation.ChannelCredentialsKakaoTalk = {
        channel: 'KAKAOTALK',
        kakaotalk_credentials: {
          kakaotalk_plus_friend_id: 'kakaotalk_friend_id',
          kakaotalk_sender_key: 'kakaotalk_sender_key',
        },
      };
      const channelCredentialsKakaoTalkChat: Conversation.ChannelCredentialsKakaoTalkChat = {
        channel: 'KAKAOTALKCHAT',
        kakaotalkchat_credentials: {
          kakaotalk_plus_friend_id: 'kakaotalk_friend_id',
          api_key: 'info_bank_api_key',
        },
      };
      const channelCredentialsLine: Conversation.ChannelCredentialsLine = {
        channel: 'LINE',
        line_credentials: {
          token: 'line_token',
          secret: 'line_secret',
        },
      };
      const channelCredentialsMms: Conversation.ChannelCredentialsMms = {
        channel: 'MMS',
        mms_credentials: {
          account_id: 'mms_account_id',
          api_key: 'mms_api_key',
          basic_auth: {
            username: 'username',
            password: 'password',
          },
          default_sender: 'default_sender',
        },
      };
      const channelCredentialsMessenger: Conversation.ChannelCredentialsMessenger = {
        channel: 'MESSENGER',
        static_token: {
          token: 'messenger_static_token',
        },
      };
      const channelCredentialsRcs: Conversation.ChannelCredentialsRcs = {
        channel: 'RCS',
        static_bearer: {
          claimed_identity: 'rcs_claimed_identity',
          token: 'rcs_token',
        },
      };
      const channelCredentialsSms: Conversation.ChannelCredentialsSms = {
        channel: 'SMS',
        static_bearer: {
          claimed_identity: 'sms_claimed_identity',
          token: 'sms_token',
        },
      };
      // const channelCredentialsSmsWithAppId: ChannelCredentialsSms = {
      //   channel: 'SMS',
      //   sms_credentials: {
      //     sms_app_id: 'sms_app_id',
      //   },
      // };
      const channelCredentialsTelegram: Conversation.ChannelCredentialsTelegram = {
        channel: 'TELEGRAM',
        telegram_credentials: {
          token: 'telegram_token',
        },
      };
      const channelCredentialsViber: Conversation.ChannelCredentialsViber = {
        channel: 'VIBER',
        static_token: {
          token: 'viber_token',
        },
      };
      const channelCredentialsViberBM: Conversation.ChannelCredentialsViberBM = {
        channel: 'VIBERBM',
        static_bearer: {
          claimed_identity: 'viberbm_claimed_identity',
          token: 'viberbm_token',
        },
      };
      const channelCredentialsWeChat: Conversation.ChannelCredentialsWeChat = {
        channel: 'WECHAT',
        wechat_credentials: {
          app_id: 'wechat_app_id',
          app_secret: 'wechat_app_secret',
          token: 'wechat_token',
          aes_key: 'wechat_aes_key',
        },
      };
      const channelCredetialsWhatsApp: Conversation.ChannelCredentialsWhatsApp = {
        channel: 'WHATSAPP',
        static_bearer: {
          claimed_identity: 'whatsapp_claimed_identity',
          token: 'whatsapp_token',
        },
      };
      const requestData: Conversation.CreateAppRequestData = {
        appCreateRequestBody: {
          display_name: 'Test App',
          channel_credentials: [
            channelCredentialsAppleBC,
            channelCredentialsInstagram,
            channelCredentialsKakaoTalk,
            channelCredentialsKakaoTalkChat,
            channelCredentialsLine,
            channelCredentialsMms,
            channelCredentialsMessenger,
            channelCredentialsRcs,
            channelCredentialsSms,
            // channelCredentialsSmsWithAppId,
            channelCredentialsTelegram,
            channelCredentialsViber,
            channelCredentialsViberBM,
            channelCredentialsWeChat,
            channelCredetialsWhatsApp,
          ],
        },
      };
      const expectedResponse: Conversation.AppResponse = {
        id: 'app_id',
        display_name: 'Test App',
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      appApi.create = fixture.create;
      const response = await appApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteApp', () => {
    it('should make a DELETE request to delete the specified App ID', async () => {
      // Given
      const requestData: Conversation.DeleteAppRequestData = {
        app_id: 'app_id',
      };
      const expectedResponse: any = {};

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      appApi.delete = fixture.delete;
      const response = await appApi.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getApp', () => {
    it('should make a GET request to retrieve the particular app as specified by the App ID', async () => {
      // Given
      const requestData: Conversation.GetAppRequestData = {
        app_id: 'app_id',
      };
      const expectedResponse: Conversation.AppResponse = {
        id: 'app_id',
        display_name: 'Test App',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      appApi.get = fixture.get;
      const response = await appApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listApps', () => {
    it('should make a GET request to get the list of all apps', async () => {
      // Given
      const requestData: Conversation.ListAppsRequestData = {};
      const expectedResponse: Conversation.ListAppsResponse = {
        apps: [
          {
            id: 'app_id',
            display_name: 'Test App',
          },
        ],
      };

      // When
      fixture.list.mockResolvedValue(expectedResponse);
      appApi.list = fixture.list;
      const response = await appApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateApp', () => {
    it('should make a PATCH request to update a particular app as specified by the App ID', async () => {
      // Given
      const requestData: Conversation.UpdateAppRequestData = {
        app_id: 'app_id',
        appUpdateRequestBody: {
          display_name: 'New display name',
        },
      };
      const expectedResponse: Conversation.AppResponse = {
        id: 'app_id',
        display_name: 'New display name',
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      appApi.update = fixture.update;
      const response = await appApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
