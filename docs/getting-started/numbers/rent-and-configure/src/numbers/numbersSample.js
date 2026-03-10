/**
 * Class to rent a specific Sinch Virtual Number through the Numbers API using the Sinch Node.js SDK.
 */
export class NumbersSample {
  /**
   * @param { NumbersService } numbersService - the NumbersService instance from the Sinch SDK containing the API methods.
   */
  constructor(numbersService) {
    this.numbersService = numbersService;
  }

  async start() {
    // Available numbers list can be retrieved by using searchForAvailableNumbers() function from Numbers service, see:
    // https://developers.sinch.com/docs/numbers/getting-started
    const phoneNumberToBeRented = 'AVAILABLE_PHONE_NUMBER_TO_BE_RENTED';
    const servicePlanIdToAssociateWithTheNumber = 'MY_SERVICE_PLAN_ID';

    const response = await this.numbersService.rent({
      phoneNumber: phoneNumberToBeRented,
      rentNumberRequestBody: {
        smsConfiguration: {
          servicePlanId: servicePlanIdToAssociateWithTheNumber,
        },
      },
    });

    console.log(`Successfully rented number: ${response.phoneNumber}`);
  }
}
