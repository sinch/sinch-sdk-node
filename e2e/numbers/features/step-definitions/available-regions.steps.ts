import { binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';
import { ListAvailableRegionsResponse, NumbersService } from "@sinch/numbers";
import { initNumbersService } from "./common";

@binding()
export class AvailableRegionsSteps {

  numbersService: NumbersService = new NumbersService({});
  response: ListAvailableRegionsResponse | undefined;

  @given('the Numbers Service is instantiated')
  public instantiateNumbersService() {
    this.numbersService  = initNumbersService();
  }

  @when('I send a request to list available regions')
  public async sendValidRequest() {
    this.response = await this.numbersService?.availableRegions.list({});
  }

  @then('the response status should be 200')
  public checkValidResponse() {
    assert.isDefined(this.response!.availableRegions);
  }

  @then('the response body should contain available regions')
  public checkResponseContent() {
    assert.isAbove(this.response!.availableRegions!.length, 0);
  }

}
