import { SvamlApi } from './svaml-api';
import {
  DescribeSvamlRequestData,
  SvamlDescriptionResponse,
  ValidateSvamlRequestData,
  ValidateSvamlResponse,
} from '../../../models/v2';

export class SvamlApiFixture implements Partial<Readonly<SvamlApi>> {

  /**
   * Fixture associated to function describe
   */
  public describe: jest.Mock<Promise<SvamlDescriptionResponse>, [DescribeSvamlRequestData]> = jest.fn();
  /**
   * Fixture associated to function validate
   */
  public validate: jest.Mock<Promise<ValidateSvamlResponse>, [ValidateSvamlRequestData]> = jest.fn();
}
