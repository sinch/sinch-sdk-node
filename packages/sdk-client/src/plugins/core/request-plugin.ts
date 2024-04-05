import { Plugin, PluginRunner } from './plugin';
import { Headers, RequestInit } from 'node-fetch';
import FormData = require('form-data');

export type RequestBody = string | FormData;

export enum RequestPluginEnum {
  ADDITIONAL_HEADER_REQUEST = 'AdditionalHeadersRequest',
  API_TOKEN_REQUEST = 'ApiTokenRequest',
  BASIC_AUTHENTICATION_REQUEST = 'BasicAuthenticationRequest',
  OAUTH2_TOKEN_REQUEST = 'Oauth2TokenRequest',
  SIGNING_REQUEST = 'SigningRequest',
  VERSION_REQUEST = 'VersionRequest',
  X_TIMESTAMP_REQUEST = 'XTimestampRequest'
}

export interface RequestOptions extends RequestInit {
  /** Query Parameters */
  queryParams?: { [key: string]: string };
  /** Force body to string */
  body?: RequestBody;
  /** Force headers to Headers type */
  headers: Headers;
  /** URL targeted without the query parameters */
  hostname: string;
  /** Path of the API*/
  path?: string;
}

/**
 * Interface of an SDK request plugin.
 * The plugin will be run on the request of a call
 */
export interface RequestPlugin extends Plugin<RequestOptions, RequestOptions> {
  /** Unique identifier of the plugin */
  getName(): string;
  /** Load the plugin with the context */
  load(): PluginRunner<RequestOptions, RequestOptions>;
}
