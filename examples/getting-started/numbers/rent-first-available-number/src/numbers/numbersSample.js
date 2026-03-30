/**
 * Class to rent any Sinch Virtual Number through the Numbers API using the Sinch Node.js SDK.
 */
export class NumbersSample {
  /**
   * @param { import('@sinch/sdk-core').NumbersService } numbersService - the NumbersService instance from the Sinch SDK containing the API methods.
   */
  constructor(numbersService) {
    this.numbersService = numbersService;
  }

  async start() {

    const servicePlanIdToAssociateWithTheNumber = 'MY_SERVICE_PLAN_ID';

    const response = await this.numbersService.rentAny({
      rentAnyNumberRequestBody: {
        regionCode: 'US',
        type: 'LOCAL',
        smsConfiguration: {
          servicePlanId: servicePlanIdToAssociateWithTheNumber,
        },
      },
    });

    console.log('Response:', response);
  }
}
