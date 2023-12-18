import { CallbackConfiguration } from '../../../models';
import {
  CallbackConfigurationApi,
  GetCallbackConfigurationRequestData,
  UpdateCallbackConfigurationRequestData,
} from './callback-configuration-api';

export class CallbackConfigurationApiFixture implements Partial<Readonly<CallbackConfigurationApi>> {

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

