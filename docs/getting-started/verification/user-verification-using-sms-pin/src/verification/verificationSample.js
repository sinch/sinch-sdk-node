// eslint-disable-next-line no-unused-vars
import { Verification, VerificationService, VerificationsApi } from '@sinch/sdk-core';
import inquirer from 'inquirer';

/**
 * Class to handle a phone number verification using SMS.
 */
export class VerificationSample {
  /**
   * @param { VerificationService } verificationService - the VerificationService instance from the Sinch SDK containing the API methods.
   */
  constructor(verificationService) {
    this.verificationService = verificationService;
  }

  /**
   * Starts the verification process by prompting the user for a phone number,
   * sending a verification request, asking for the verification code, and reporting it.
   * @return {Promise<void>}
   */
  async start() {
    // Step 1: Ask the phone number to verify
    const e164Number = await this.promptPhoneNumber();

    try {
      // Step 2: Start the phone number verification
      const verificationId = await this.startSmsVerification(this.verificationService.verifications, e164Number);

      // Step 3: Ask the user for the received verification code
      const code = await this.promptSmsCode();

      // Step 4: Report the verification code and complete the process
      await this.reportSmsVerification(this.verificationService.verifications, code, verificationId);

      console.log('Verification successfully completed.');
    } catch (error) {
      console.error('An error occurred during the verification process:', error);
    }
  }

  /**
   * Prompts the user to enter their phone number.
   * @return {Promise<string>} The phone number entered by the user.
   */
  async promptPhoneNumber() {
    const userInput = await inquirer.prompt([
      {
        type: 'input',
        name: 'phoneNumber',
        message: 'Enter the phone number you want to verify (E.164 format):',
        validate: (input) => input ? true : 'Phone number cannot be empty.',
      },
    ]);

    return userInput.phoneNumber;
  }

  /**
   * Sends a request to start SMS verification for a phone number.
   * @param {VerificationsApi} verificationStarter - The VerificationsApi instance.
   * @param {string} phoneNumber - The phone number to verify.
   * @return {Promise<string>} The verification ID if the request is successful.
   */
  async startSmsVerification(verificationStarter, phoneNumber) {
    console.log(`Sending a verification request to ${phoneNumber}`);

    const requestData = Verification.startVerificationHelper.buildSmsRequest(phoneNumber);

    try {
      const response = await verificationStarter.startSms(requestData);

      if (!response.id) {
        throw new Error('Verification ID is undefined.');
      }

      console.log(`Verification started successfully. Verification ID: ${response.id}`);
      return response.id;
    } catch (error) {
      console.error('Failed to start SMS verification:', error);
      throw error;
    }
  }

  /**
   * Prompts the user to enter the verification code they received.
   * @return {Promise<string>} The verification code entered by the user.
   */
  async promptSmsCode() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'code',
        message: 'Enter the verification code you received:',
        validate: (input) => input ? true : 'Verification code cannot be empty.',
      },
    ]);
    return answers.code;
  }

  /**
   * Sends a request to report the verification code for a specific verification ID.
   * @param { VerificationsApi } verificationReporter - The VerificationsApi instance.
   * @param {string} code - The verification code to report.
   * @param {string} id - The verification ID corresponding to the process.
   * @return {Promise<void>}
   */
  async reportSmsVerification(verificationReporter, code, id) {
    const requestData = Verification.reportVerificationByIdHelper.buildSmsRequest(id, code);

    try {
      const response = await verificationReporter.reportSmsById(requestData);
      console.log(`Verification reported successfully. Response status: ${response.status}`);
    } catch (error) {
      console.error('Failed to report SMS verification:', error);
      throw error;
    }
  }
}
