import {
  CallbackConfiguration,
  GetCallbackConfigurationRequestData,
  UpdateCallbackConfigurationRequestData,
} from '../../../models';
import { CallbacksApi } from './callbacks-api';

export class CallbackConfigurationApiFixture implements Partial<Readonly<CallbacksApi>> {

  /**
   * Fixture associated to function get
   */
  public get:
   jest.Mock<Promise<CallbackConfiguration>, [GetCallbackConfigurationRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update:
   jest.Mock<Promise<CallbackConfiguration>, [UpdateCallbackConfigurationRequestData]> = jest.fn();
}

