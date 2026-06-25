import { ResolvedSinchClientParameters } from '../domain';
import { ApiFetchClient } from './api-fetch-client';

/**
 * Base class for domain lazy clients that share resolved SDK configuration.
 * @internal
 */
export abstract class LazyApiClient {
  public apiFetchClient?: ApiFetchClient;
  public sharedConfig: ResolvedSinchClientParameters;

  constructor(sharedConfig: ResolvedSinchClientParameters) {
    this.sharedConfig = sharedConfig;
  }

  public resetApiClient(): void {
    this.apiFetchClient = undefined;
  }
}
