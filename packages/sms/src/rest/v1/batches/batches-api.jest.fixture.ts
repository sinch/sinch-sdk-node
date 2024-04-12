import { BatchesApi } from './batches-api';
import {
  BinaryResponse,
  CancelBatchMessageRequestData,
  DeliveryFeedbackRequestData,
  DryRunRequestData,
  DryRunResponse,
  GetBatchMessageRequestData,
  ListBatchesRequestData,
  MediaResponse,
  ReplaceBatchMessageRequestData,
  SendBinarySMSRequestData,
  SendMediaSMSRequestData,
  SendSMSRequestData,
  SendSMSResponse,
  SendTextSMSRequestData,
  TextResponse,
  UpdateBatchMessageRequestData,
} from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class BatchesApiFixture implements Partial<Readonly<BatchesApi>> {

  /**
    * Fixture associated to function cancel
    */
  public cancel: jest.Mock<Promise<SendSMSResponse>, [CancelBatchMessageRequestData]> = jest.fn();
  /**
    * Fixture associated to function sendDeliveryFeedback
    */
  public sendDeliveryFeedback: jest.Mock<Promise<void>, [DeliveryFeedbackRequestData]> = jest.fn();
  /**
    * Fixture associated to function dryRun
    */
  public dryRun: jest.Mock<Promise<DryRunResponse>, [DryRunRequestData]> = jest.fn();
  /**
    * Fixture associated to function get
    */
  public get: jest.Mock<Promise<SendSMSResponse>, [GetBatchMessageRequestData]> = jest.fn();
  /**
    * Fixture associated to function list
    */
  public list: jest.Mock<ApiListPromise<SendSMSResponse>, [ListBatchesRequestData]> = jest.fn();
  /**
    * Fixture associated to function replace
    */
  public replace: jest.Mock<Promise<SendSMSResponse>, [ReplaceBatchMessageRequestData]> = jest.fn();
  /**
    * Fixture associated to function send
    */
  public send: jest.Mock<Promise<SendSMSResponse>, [SendSMSRequestData]> = jest.fn();
  /**
   * Fixture associated to function sendTextMessage
   */
  public sendTextMessage: jest.Mock<Promise<TextResponse>, [SendTextSMSRequestData]> = jest.fn();
  /**
   * Fixture associated to function send
   */
  public sendBinaryMessage: jest.Mock<Promise<BinaryResponse>, [SendBinarySMSRequestData]> = jest.fn();
  /**
   * Fixture associated to function send
   */
  public sendMediaMessage: jest.Mock<Promise<MediaResponse>, [SendMediaSMSRequestData]> = jest.fn();
  /**
    * Fixture associated to function update
    */
  public update: jest.Mock<Promise<SendSMSResponse>, [UpdateBatchMessageRequestData]> = jest.fn();
}
