/**
 * Class to lookup a number through the NumberLookup API using the Sinch Node.js SDK.
 */
export class NumberLookupSample {
  /**
   * @param { NumberLookupService } numberLookupService - the NumberLookupService instance from the Sinch SDK containing the API methods.
   */
  constructor(numberLookupService) {
    this.numberLookupService = numberLookupService;
  }

  async start() {
    // The phone number to lookup in E.164 format
    const phoneNumber = 'PHONE_NUMBER_TO_LOOKUP';

    const response = await this.numberLookupService.lookup({
      numberLookupRequestBody: {
        number: phoneNumber,
      },
    });

    console.log('Response:', response);
  }
}
