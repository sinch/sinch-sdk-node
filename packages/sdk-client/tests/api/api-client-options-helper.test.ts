import {
  ApiTokenRequest,
  buildApplicationSignedApiClientOptions,
  buildFlexibleOAuth2OrApiTokenApiClientOptions,
  buildOAuth2ApiClientOptions,
  Oauth2TokenRequest,
  PluginRunner,
  Region,
  SigningRequest,
  SinchClientParameters,
  XTimestampRequest,
} from '../../src';
import { RequestOptions, RequestPlugin } from '../../src/plugins/core/request-plugin';
import { ResponsePlugin, ResponsePluginContext } from '../../src/plugins/core/response-plugin';

const dummyRequestPlugin: RequestPlugin = {
  getName(): string {
    return 'dummy-request-plugin';
  },
  load(): PluginRunner<RequestOptions, RequestOptions> {
    return {
      transform(data: RequestOptions): Promise<RequestOptions> | RequestOptions {
        return data;
      },
    };
  },
};

const dummyResponsePlugin: ResponsePlugin<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load(_context: ResponsePluginContext): PluginRunner<any, { [p: string]: any } | undefined> {
    return {
      transform(data: { [p: string]: any } | undefined): any {
        return data;
      },
    };
  },
};

describe('API Client Options helper', () => {

  describe('buildOAuth2ApiClientOptions', () => {
    it('should build some API client options to perform OAuth2 authentication', () => {
      // Given
      const params: SinchClientParameters = {
        projectId: 'PROJECT_ID',
        keyId: 'KEY_ID',
        keySecret: 'KEY_SECRET',
      };

      // When
      const apiClientOptions = buildOAuth2ApiClientOptions(params, 'foo');

      // Then
      expect(apiClientOptions).toBeDefined();
      expect(apiClientOptions.requestPlugins?.length).toBe(1);
      expect(apiClientOptions.requestPlugins?.[0]).toBeInstanceOf(Oauth2TokenRequest);
      expect(apiClientOptions.responsePlugins).toBeUndefined();
    });

    it('should build some API client options with additional plugins', () => {
      // Given
      const params: SinchClientParameters = {
        projectId: 'PROJECT_ID',
        keyId: 'KEY_ID',
        keySecret: 'KEY_SECRET',
        requestPlugins: [dummyRequestPlugin],
        responsePlugins: [dummyResponsePlugin],
      };

      // When
      const apiClientOptions = buildOAuth2ApiClientOptions(params, 'foo');

      // Then
      expect(apiClientOptions.requestPlugins?.length).toBe(2);
      expect(apiClientOptions.responsePlugins?.length).toBe(1);
    });

    it('should throw an exception when some credentials are missing', () => {
      // Given
      const params: SinchClientParameters = {
        projectId: 'PROJECT_ID',
      };

      // When
      const buildApiClientOptionsFunction = () => buildOAuth2ApiClientOptions(params, 'foo');

      // Then
      expect(buildApiClientOptionsFunction).toThrow(
        'Invalid configuration for the foo API: "projectId", "keyId" and "keySecret" values must be provided');
    });
  });

  describe('buildApplicationSignedApiClientOptions', () => {
    it('should build some API client options to perform application-signed authentication', () => {
      // Given
      const params: SinchClientParameters = {
        applicationKey: 'APPLICATION_KEY',
        applicationSecret: 'APPLICATION_SECRET',
      };

      // When
      const apiClientOptions = buildApplicationSignedApiClientOptions(params, 'foo');

      // Then
      expect(apiClientOptions).toBeDefined();
      expect(apiClientOptions.requestPlugins?.length).toBe(2);
      const requestPlugins = apiClientOptions.requestPlugins!;
      const xTimestampRequestPlugin = requestPlugins.filter((plugin) => plugin instanceof XTimestampRequest);
      expect(xTimestampRequestPlugin.length).toBe(1);
      const signingRequestPlugin = requestPlugins.filter((plugin) => plugin instanceof SigningRequest);
      expect(signingRequestPlugin.length).toBe(1);
      expect(apiClientOptions.responsePlugins).toBeUndefined();
    });

    it('should build some API client options with additional plugins', () => {
      // Given
      const params: SinchClientParameters = {
        applicationKey: 'APPLICATION_KEY',
        applicationSecret: 'APPLICATION_SECRET',
        requestPlugins: [dummyRequestPlugin],
        responsePlugins: [dummyResponsePlugin],
      };

      // When
      const apiClientOptions = buildApplicationSignedApiClientOptions(params, 'foo');

      // Then
      expect(apiClientOptions.requestPlugins?.length).toBe(3);
      expect(apiClientOptions.responsePlugins?.length).toBe(1);
    });

    it('should throw an exception when some credentials are missing', () => {
      // Given
      const params: SinchClientParameters = {
        applicationKey: 'APPLICATION_KEY',
      };

      // When
      const buildApiClientOptionsFunction = () => buildApplicationSignedApiClientOptions(params, 'foo');

      // Then
      expect(buildApiClientOptionsFunction).toThrow(
        'Invalid configuration for the foo API: "applicationKey" and "applicationSecret" values must be provided');
    });
  });


  describe('buildFlexibleOAuth2OrApiTokenApiClientOptions', () => {
    // eslint-disable-next-line max-len
    it('should build some API client options to perform OAuth2 authentication when the credentials are present and the region is supported', () => {
      // Given
      const params: SinchClientParameters = {
        projectId: 'PROJECT_ID',
        keyId: 'KEY_ID',
        keySecret: 'KEY_SECRET',
        servicePlanId: 'SERVICE_PLAN_ID',
        apiToken: 'API_TOKEN',
      };
      const region = Region.EUROPE;

      // When
      const apiClientOptions = buildFlexibleOAuth2OrApiTokenApiClientOptions(params, region, 'foo');

      // Then
      expect(apiClientOptions).toBeDefined();
      expect(apiClientOptions.requestPlugins?.length).toBe(1);
      expect(apiClientOptions.requestPlugins?.[0]).toBeInstanceOf(Oauth2TokenRequest);
      expect(apiClientOptions.responsePlugins).toBeUndefined();
    });

    // eslint-disable-next-line max-len
    it('should build some API client options to perform API token authentication when the credentials are present and the region is not supported by OAuth2 authentication', () => {
      // Given
      const params: SinchClientParameters = {
        projectId: 'PROJECT_ID',
        keyId: 'KEY_ID',
        keySecret: 'KEY_SECRET',
        servicePlanId: 'SERVICE_PLAN_ID',
        apiToken: 'API_TOKEN',
      };
      const region = Region.CANADA;

      // When
      const apiClientOptions = buildFlexibleOAuth2OrApiTokenApiClientOptions(params, region, 'foo');

      // Then
      expect(apiClientOptions).toBeDefined();
      expect(apiClientOptions.requestPlugins?.length).toBe(1);
      expect(apiClientOptions.requestPlugins?.[0]).toBeInstanceOf(ApiTokenRequest);
      expect(apiClientOptions.responsePlugins).toBeUndefined();
    });

    it('should force the usage of API token authentication even when the region supports OAuth2 authentication', () => {
      // Given
      const params: SinchClientParameters = {
        projectId: 'PROJECT_ID',
        keyId: 'KEY_ID',
        keySecret: 'KEY_SECRET',
        servicePlanId: 'SERVICE_PLAN_ID',
        apiToken: 'API_TOKEN',
        forceServicePlanIdUsageForSmsApi: true,
      };
      const region = Region.EUROPE;

      // When
      const apiClientOptions = buildFlexibleOAuth2OrApiTokenApiClientOptions(params, region, 'foo');

      // Then
      expect(apiClientOptions).toBeDefined();
      expect(apiClientOptions.requestPlugins?.length).toBe(1);
      expect(apiClientOptions.requestPlugins?.[0]).toBeInstanceOf(ApiTokenRequest);
      expect(apiClientOptions.responsePlugins).toBeUndefined();
    });

    it('should build some API client options with additional plugins', () => {
      // Given
      const params: SinchClientParameters = {
        servicePlanId: 'SERVICE_PLAN_ID',
        apiToken: 'API_TOKEN',
        requestPlugins: [dummyRequestPlugin],
        responsePlugins: [dummyResponsePlugin],
      };
      const region = Region.CANADA;

      // When
      const apiClientOptions = buildFlexibleOAuth2OrApiTokenApiClientOptions(params, region, 'foo');

      // Then
      expect(apiClientOptions.requestPlugins?.length).toBe(2);
      expect(apiClientOptions.responsePlugins?.length).toBe(1);
    });

    // eslint-disable-next-line max-len
    it('should throw an exception when the parameters are inconsistent: missing params for OAuth2 authentication', () => {
      // Given
      const params: SinchClientParameters = {
        projectId: 'PROJECT_ID',
      };
      const region = Region.EUROPE;

      // When
      const buildApiClientOptionsFunction = () => buildFlexibleOAuth2OrApiTokenApiClientOptions(params, region, 'foo');

      // Then
      expect(buildApiClientOptionsFunction).toThrow('Invalid parameters for the foo API: check your configuration');
    });

    // eslint-disable-next-line max-len
    it('should throw an exception when the parameters are inconsistent: missing params for API Token authentication', () => {
      // Given
      const params: SinchClientParameters = {
        servicePlanId: 'SERVICE_PLAN_ID',
      };
      const region = Region.EUROPE;

      // When
      const buildApiClientOptionsFunction = () => buildFlexibleOAuth2OrApiTokenApiClientOptions(params, region, 'foo');

      // Then
      expect(buildApiClientOptionsFunction).toThrow('Invalid parameters for the foo API: check your configuration');
    });

    // eslint-disable-next-line max-len
    it('should throw an exception when the parameters are inconsistent: unsupported region for OAuth2 authentication', () => {
      // Given
      const params: SinchClientParameters = {
        projectId: 'PROJECT_ID',
        keyId: 'KEY_ID',
        keySecret: 'KEY_SECRET',
      };
      const region = Region.CANADA;

      // When
      const buildApiClientOptionsFunction = () => buildFlexibleOAuth2OrApiTokenApiClientOptions(params, region, 'foo');

      // Then
      expect(buildApiClientOptionsFunction).toThrow('Invalid parameters for the foo API: check your configuration');
    });

    // eslint-disable-next-line max-len
    it('should throw an exception when the parameters are inconsistent: missing parameters when forcing API Token authentication', () => {
      // Given
      const params: SinchClientParameters = {
        projectId: 'PROJECT_ID',
        keyId: 'KEY_ID',
        keySecret: 'KEY_SECRET',
        forceServicePlanIdUsageForSmsApi: true,
      };
      const region = Region.EUROPE;

      // When
      const buildApiClientOptionsFunction = () => buildFlexibleOAuth2OrApiTokenApiClientOptions(params, region, 'foo');

      // Then
      expect(buildApiClientOptionsFunction).toThrow('Invalid parameters for the foo API: check your configuration');
    });
  });

});
