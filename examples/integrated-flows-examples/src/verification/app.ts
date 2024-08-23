import inquirer from 'inquirer';
import { SinchClient, Verification } from '@sinch/sdk-core';
import dotenv from 'dotenv';
dotenv.config();

(async() => {

  // Scenario: perform a number verification
  // 1 - Ask the users to choose the kind of verification they want to perform
  // 2 - Ask for the phone number to verify
  // 3 - Start the verification with the chosen method
  // 4 - Ask for OTP and report the verification (not needed for seamless verification)
  // 5 - Display the status of the verification

  const applicationKey = process.env.SINCH_APPLICATION_KEY || '';
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET || '';
  const sinch = new SinchClient({ applicationKey, applicationSecret });

  enum VerificationMethods {
    SMS ='sms',
    PHONE_CALL = 'phone call',
    FLASH_CALL = 'flash call',
    DATA = 'data',
  }

  inquirer.prompt([
    {
      type: 'list',
      name: 'method',
      message: 'Please select which method of verification you want to use:',
      choices: Object.values(VerificationMethods),
    },
    {
      type: 'input',
      name: 'phoneNumber',
      message: 'Enter the phone number you want to verify:',
    },
  ])
    .then((answers: any) => {
      switch (answers.method) {
      case VerificationMethods.SMS:
        startSmsVerificationFlow(answers.phoneNumber);
        break;
      case VerificationMethods.PHONE_CALL:
        startPhoneCallVerificationFlow(answers.phoneNumber);
        break;
      case VerificationMethods.FLASH_CALL:
        startFlashCallVerificationFlow(answers.phoneNumber);
        break;
      case VerificationMethods.DATA:
        startSeamlessVerificationFlow(answers.phoneNumber);
        break;
      }
    });

  const startSmsVerificationFlow = async (phoneNumber: string) => {
    const requestData = Verification.startVerificationHelper.buildSmsRequest(phoneNumber);
    const response = await sinch.verification.startVerifications.startSms(requestData);
    console.log('Verification request sent! Please check the SMS on your you phone to get the OTP.');
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'code',
        message: 'Enter the verification code:',
      },
    ]);
    const reportRequestData = Verification.reportVerificationByIdHelper.buildSmsRequest(
      response.id!, answers.code);
    const reportResponse = await sinch.verification.verifications.reportSmsById(reportRequestData);
    console.log(`Verification status: ${reportResponse.status}${reportResponse.status === 'SUCCESSFUL' ? '' : ' - Reason: ' + reportResponse.reason}`);


  };

  const startPhoneCallVerificationFlow = async (phoneNumber: string) => {
    const requestData = Verification.startVerificationHelper.buildPhoneCallRequest(phoneNumber);
    const response = await sinch.verification.startVerifications.startPhoneCall(requestData);
    console.log('Verification request sent! Please answer to the phone call ans listen to the OTP.');
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'code',
        message: 'Enter the verification code:',
      },
    ]);
    const reportRequestData = Verification.reportVerificationByIdHelper.buildCalloutRequest(
      response.id!, answers.code);
    const reportResponse = await sinch.verification.verifications.reportCalloutById(reportRequestData);
    console.log(`Verification status: ${reportResponse.status}${reportResponse.status === 'SUCCESSFUL'?'':' - Reason: ' + reportResponse.reason}`);
  };

  const startFlashCallVerificationFlow = async (phoneNumber: string) => {
    const requestData = Verification.startVerificationHelper.buildFlashCallRequest(phoneNumber);
    const response = await sinch.verification.startVerifications.startFlashCall(requestData);
    console.log('Verification request sent! Please check the phone number calling you.');
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'cli',
        message: 'Enter the caller ID:',
      },
    ]);
    const reportRequestData = Verification.reportVerificationByIdHelper.buildFlashCallRequest(
        response.id!,
        answers.cli,
    );
    const reportResponse = await sinch.verification.verifications.reportFlashCallById(reportRequestData);
    console.log(`Verification status: ${reportResponse.status}${reportResponse.status === 'SUCCESSFUL'?'':' - Reason: ' + reportResponse.reason}`);
  };

  const startSeamlessVerificationFlow = async (phoneNumber: string) => {
    const requestData = Verification.startVerificationHelper.buildDataRequest(phoneNumber);
    let response;
    try {
      response = await sinch.verification.startVerifications.startData(requestData);
    } catch (error: any) {
      console.log(`Impossible to process the seamless verification: ${error.data})`);
      return;
    }
    const verificationStatusRequestData: Verification.VerificationStatusByIdRequestData = {
      id: response.id!,
    };
    const statusResponse = await sinch.verification.verificationStatus.getById(verificationStatusRequestData);
    console.log(`Verification status: ${statusResponse.status}${statusResponse.status === 'SUCCESSFUL'?'':' - Reason: ' + statusResponse.reason}`);
  };

})();
