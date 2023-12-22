import { GetCalloutResponseObj } from '../../../models';
import { CalloutsApi, CalloutsRequestData } from './callouts-api';

export class CalloutsApiFixture implements Partial<Readonly<CalloutsApi>> {

  /**
   * Fixture associated to function callouts
   */
  public callouts: jest.Mock<Promise<GetCalloutResponseObj>, [CalloutsRequestData]> = jest.fn();
}

