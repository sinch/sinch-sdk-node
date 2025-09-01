import { Verification } from '@sinch/sdk-core';
import {
  getPrintFormat,
  getVerificationIdentityFromConfig,
  initVerificationService,
  printFullResponse,
} from '../../../config';

(async () => {
  console.log('********************************');
  console.log('* StartVerification - WhatsApp *');
  console.log('********************************');

  const verificationIdentity = getVerificationIdentityFromConfig();

  const requestData = Verification.startVerificationHelper.buildWhatsAppRequest(
    verificationIdentity,
    `test-reference-for-whatsapp-verification_${verificationIdentity}`,
    {
      codeType: 'NUMERIC',
    },
  );

  const verificationService = initVerificationService();
  const response = await verificationService.verifications.startWhatsApp(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Verification ID = ${response.id}`);
    console.log(`Whatsapp verification specific field: template = ${JSON.stringify(response.whatsapp, null, 2)}`);
  } else {
    printFullResponse(response);
  }

})();
