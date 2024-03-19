import { DeliveryReportsApi, GetDeliveryReportByBatchIdRequestData, GetDeliveryReportByPhoneNumberRequestData, ListDeliveryReportsRequestData } from './delivery-reports-api';
import { DeliveryReport, RecipientDeliveryReport } from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class DeliveryReportsApiFixture implements Partial<Readonly<DeliveryReportsApi>> {

  /**
    * Fixture associated to function getByBatchId
    */
  public get: jest.Mock<Promise<DeliveryReport>,
    [GetDeliveryReportByBatchIdRequestData]> = jest.fn();
  /**
    * Fixture associated to function getForNumber
    */
  public getForNumber: jest.Mock<Promise<RecipientDeliveryReport>,
    [GetDeliveryReportByPhoneNumberRequestData]> = jest.fn();
  /**
    * Fixture associated to function list
    */
  public list: jest.Mock<ApiListPromise<RecipientDeliveryReport>, [ListDeliveryReportsRequestData]> = jest.fn();
}
