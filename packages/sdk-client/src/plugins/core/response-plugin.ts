import { Plugin, PluginRunner } from './plugin';
import { Response } from 'node-fetch';
import { RequestOptions } from './request-plugin';

/**
 * Interface of an SDK response plugin.
 * The plugin will be run on the response of a call
 */
export interface ResponsePluginContext {
  /** Response from Fetch call */
  response?: Response;

  /** Name of the API */
  apiName: string;

  /** Exception thrown during call/parse of the response */
  exception?: Error;

  /** Operation ID */
  operationId: string;

  /** Base url */
  url: string;

  /** Origin domain initiating the call */
  origin?: string | null;

  /** Request parameters */
  requestOptions: RequestOptions;
}

/**
 * Interface of an SDK response plugin.
 * The plugin will be run on the response of a call
 */
export interface ResponsePlugin<T, V = { [key: string]: any }>
  extends Plugin<T, V> {
  /** Load the plugin with the context */
  load<K>(context: ResponsePluginContext): PluginRunner<T | K, V | undefined>;
}
