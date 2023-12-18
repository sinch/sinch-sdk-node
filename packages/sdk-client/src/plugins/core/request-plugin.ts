import { Plugin, PluginRunner } from './plugin';
import { Headers, RequestInit } from 'node-fetch';
import FormData = require('form-data');

export type RequestBody = string | FormData;

export interface RequestOptions extends RequestInit {
  /** Query Parameters */
  queryParams?: { [key: string]: string };
  /** Force body to string */
  body?: RequestBody;
  /** Force headers to Headers type */
  headers: Headers;
  /** URL targeted without the query parameters */
  basePath: string;
  /** Path of the API*/
  path?: string;
}

/**
 * Interface of an SDK request plugin.
 * The plugin will be run on the request of a call
 */
export interface RequestPlugin extends Plugin<RequestOptions, RequestOptions> {
  /** Load the plugin with the context */
  load(): PluginRunner<RequestOptions, RequestOptions>;
}
