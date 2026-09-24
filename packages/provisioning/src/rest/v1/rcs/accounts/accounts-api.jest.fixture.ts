import { RcsAccountsApi } from './accounts-api';
import {
  CreateCommentRequestData,
  ListActivitiesRequestData,
  RcsAccountNotification,
  RcsComment,
} from '../../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class RcsAccountsApiFixture implements Partial<Readonly<RcsAccountsApi>> {

  public createComment: jest.Mock<Promise<RcsComment>, [CreateCommentRequestData]> = jest.fn();
  public listActivities: jest.Mock<ApiListPromise<RcsAccountNotification>, [ListActivitiesRequestData?]> = jest.fn();
}
