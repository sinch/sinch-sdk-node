import { SessionsApi } from './sessions-api';
import {
  GetSessionByIdRequestData,
  Session,
} from '../../../models/v2';

export class SessionsApiFixture implements Partial<Readonly<SessionsApi>> {

  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<Session>, [GetSessionByIdRequestData]> = jest.fn();
}
