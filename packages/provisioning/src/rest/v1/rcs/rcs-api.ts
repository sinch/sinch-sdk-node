import { LazyProvisioningApiClient } from '../provisioning-service';
import { RcsAccountsApi } from './accounts';

/**
 * RCS subsection of the Provisioning API.
 */
export class RcsApi {
  public readonly accounts: RcsAccountsApi;

  constructor(lazyClient: LazyProvisioningApiClient) {
    this.accounts = new RcsAccountsApi(lazyClient);
  }
}
