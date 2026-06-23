import { ResolvedSinchClientParameters, SinchClientParameters } from '../domain';
import { resolveClientParameters } from '../logger';
import { ApiFetchClient } from './api-fetch-client';

/** Base class for domain lazy clients that share resolved SDK configuration. */
export abstract class LazyApiClient {
  public apiFetchClient?: ApiFetchClient;
  public sharedConfig: ResolvedSinchClientParameters;

  constructor(params: SinchClientParameters | ResolvedSinchClientParameters) {
    this.sharedConfig = resolveClientParameters(params);
  }

  public resetApiClient(): void {
    this.apiFetchClient = undefined;
  }
}
