/**
 * Class to list some Sinch Virtual Numbers through the Conversation API using the Sinch Node.js SDK.
 */
export class NumbersSample {
  /**
   * @param { NumbersService } numbersService - the NumbersService instance from the Sinch SDK containing the API methods.
   */
  constructor(numbersService) {
    this.numbersService = numbersService;
  }

  async start() {

    const response = await this.numbersService.searchForAvailableNumbers({
      regionCode: 'US',
      type: 'LOCAL',
    });

    console.log('Response:', response.availableNumbers);
  }
}
