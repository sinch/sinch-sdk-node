import { ConsentsApi } from './consents-api';
import {
  ListAuditRecordsRequestData,
  ListIdentitiesRequestData,
  AuditRecordsList,
  ConsentIdentity,
} from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class ConsentsApiFixture implements Partial<Readonly<ConsentsApi>> {

  /**
   * Fixture associated to function listIdentities
   */
  public listIdentities: jest.Mock<ApiListPromise<ConsentIdentity>, [ListIdentitiesRequestData]> = jest.fn();
  /**
   * Fixture associated to function listAuditRecords
   */
  public listAuditRecords: jest.Mock<Promise<AuditRecordsList>, [ListAuditRecordsRequestData]> = jest.fn();
}
