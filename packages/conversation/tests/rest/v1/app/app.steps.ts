import { AppApi, Conversation, ConversationService, SupportedConversationRegion } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { ChannelCredentialsSmsResponse } from '../../../../src/models';

let appsApi: AppApi;
let appResponse: Conversation.AppResponse;
let listResponse: Conversation.ListAppsResponse;
let deleteAppResponse: void;

Given('the Conversation service "Apps" is available', function () {
  const conversationService = new ConversationService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    conversationHostname: 'http://localhost:3014',
    conversationRegion: SupportedConversationRegion.UNITED_STATES,
  });
  appsApi = conversationService.app;
});

When('I send a request to create an app', async () => {
  appResponse = await appsApi.create({
    appCreateRequestBody: {
      display_name: 'E2E Conversation App',
      channel_credentials: [
        {
          channel: 'SMS',
          static_bearer: {
            claimed_identity: 'SpaceMonkeySquadron',
            token: '00112233445566778899aabbccddeeff',
          },
        },
      ],
    },
  });
});

Then('the conversation app is created', () => {
  assert.equal(appResponse.id, '01W4FFL35P4NC4K35CONVAPP001');
  assert.equal(appResponse.channel_credentials?.length, 1);
  assert.equal(appResponse.channel_credentials?.[0].state?.status, 'PENDING');
  assert.equal(appResponse.conversation_metadata_report_view, 'NONE');
  assert.equal(appResponse.display_name, 'E2E Conversation App');
  assert.equal(appResponse.processing_mode, 'CONVERSATION');
});

When('I send a request to list all the apps', async () => {
  listResponse = await appsApi.list({});
});

Then('the apps list contains 2 apps', () => {
  assert.equal(listResponse.apps?.length, 2);
  const app1 = listResponse.apps![0];
  assert.equal(app1.id, '01W4FFL35P4NC4K35CONVAPP001');
  assert.equal(app1.channel_credentials?.[0].state?.status, 'ACTIVE');
  assert.equal(app1.conversation_metadata_report_view, 'NONE');
  const app2 = listResponse.apps![1];
  assert.equal(app2.id, '01W4FFL35P4NC4K35CONVAPP002');
  assert.equal(app2.channel_credentials?.length, 2);
  assert.equal(app2.channel_credentials?.[0].state?.status, 'FAILING');
  assert.equal(app2.conversation_metadata_report_view, 'FULL');
});

When('I send a request to retrieve an app', async () => {
  appResponse = await appsApi.get({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
  });
});

Then('the response contains the app details', () => {
  assert.equal(appResponse.id, '01W4FFL35P4NC4K35CONVAPP001');
  assert.equal(appResponse.conversation_metadata_report_view, 'NONE');
  assert.equal(appResponse.display_name, 'E2E Conversation App');
  assert.equal(appResponse.processing_mode, 'CONVERSATION');
  assert.equal(appResponse.rate_limits?.outbound, 20);
  assert.equal(appResponse.rate_limits?.inbound, 100);
  assert.equal(appResponse.rate_limits?.webhooks, 100);
  assert.equal(appResponse.retention_policy?.retention_type, 'MESSAGE_EXPIRE_POLICY');
  assert.equal(appResponse.retention_policy?.ttl_days, 180);
  assert.equal(appResponse.dispatch_retention_policy?.retention_type, 'MESSAGE_EXPIRE_POLICY');
  assert.equal(appResponse.dispatch_retention_policy?.ttl_days, 0);
  assert.equal(appResponse.smart_conversation?.enabled, false);
  assert.equal(appResponse.queue_stats?.outbound_size, 0);
  assert.equal(appResponse.queue_stats?.outbound_limit, 500000);
  assert.equal(appResponse.persist_message_status?.enabled, false);
  assert.equal(appResponse.message_search?.enabled, false);
  assert.equal(appResponse.callback_settings?.secret_for_overridden_callback_urls, '');
  assert.equal(appResponse.delivery_report_based_fallback?.enabled, false);
  assert.equal(appResponse.delivery_report_based_fallback?.delivery_report_waiting_time, 0);
  assert.equal(appResponse.message_retry_settings?.retry_duration, 3600);
  const channelCredentials = appResponse.channel_credentials![0] as ChannelCredentialsSmsResponse;
  assert.equal(channelCredentials.channel, 'SMS');
  assert.equal(channelCredentials.static_bearer.claimed_identity, 'SpaceMonkeySquadron');
  assert.equal(channelCredentials.static_bearer.token, '00112233445566778899aabbccddeeff');
  assert.equal(channelCredentials.callback_secret, '');
  assert.equal(channelCredentials.state?.status, 'ACTIVE');
  assert.equal(channelCredentials.state?.description, '');
  assert.equal(channelCredentials.channel_known_id, '');
});

When('I send a request to update an app', async () => {
  appResponse = await appsApi.update({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
    appUpdateRequestBody: {
      display_name: 'Updated name',
    },
  });
});

Then('the response contains the app details with updated properties', () => {
  assert.equal(appResponse.id, '01W4FFL35P4NC4K35CONVAPP001');
  assert.equal(appResponse.display_name, 'Updated name');
});

When('I send a request to delete an app', async () => {
  deleteAppResponse = await appsApi.delete({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
  });
});

Then('the delete app response contains no data', () => {
  assert.deepEqual(deleteAppResponse, {} );
});
