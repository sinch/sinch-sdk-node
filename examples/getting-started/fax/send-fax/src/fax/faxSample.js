/**
 * Class to send a demo fax using the Sinch Node.js SDK.
 */
export class FaxSample {
  /**
   * @param { import('@sinch/sdk-core').FaxService } faxService - the FaxService instance from the Sinch SDK containing the API methods.
   */
  constructor(faxService) {
    this.faxService = faxService;
  }

  async start() {
    const recipient = 'YOUR_FAX_NUMBER';
    const contentUrl = 'https://developers.sinch.com/fax/fax.pdf';
    const callbackUrl = 'FAX_CALLBACK_URL';

    const response = await this.faxService.faxes.send({
      sendFaxRequestBody: {
        to: recipient,
        contentUrl,
        ...(callbackUrl !== 'FAX_CALLBACK_URL' && { callbackUrl }),
      },
    });

    const fax = response[0];
    console.log('Fax ID:', fax.id);
    console.log('Status:', fax.status);
    console.log('Response:', response);
  }
}
