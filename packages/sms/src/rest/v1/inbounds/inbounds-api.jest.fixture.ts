import { InboundsApi, ListInboundMessagesRequestData, GetInboundMessageRequestData } from './inbounds-api';
import { InboundMessageResponse } from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class InboundsApiFixture implements Partial<Readonly<InboundsApi>> {

  /**
    * Fixture associated to function list
    */
  public list: jest.Mock<ApiListPromise<InboundMessageResponse>, [ListInboundMessagesRequestData]> = jest.fn();
  /**
    * Fixture associated to function get
    */
  public get: jest.Mock<Promise<InboundMessageResponse>,
    [GetInboundMessageRequestData]> = jest.fn();
}
