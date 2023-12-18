import { DeliveryReportsApi, GetDeliveryReportByBatchIdRequestData, GetDeliveryReportByPhoneNumberRequestData, GetDeliveryReportsRequestData } from './delivery-reports-api';
import { DeliveryReport, RecipientDeliveryReport } from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class DeliveryReportsApiFixture implements Partial<Readonly<DeliveryReportsApi>> {

  /**
    * Fixture associated to function getByBatchId
    */
  public get: jest.Mock<Promise<DeliveryReport>,
    [GetDeliveryReportByBatchIdRequestData]> = jest.fn();
  /**
    * Fixture associated to function getDeliveryReportByPhoneNumber
    */
  public getByPhoneNumber: jest.Mock<Promise<RecipientDeliveryReport>,
    [GetDeliveryReportByPhoneNumberRequestData]> = jest.fn();
  /**
    * Fixture associated to function list
    */
  public list: jest.Mock<ApiListPromise<RecipientDeliveryReport>, [GetDeliveryReportsRequestData]> = jest.fn();
}
