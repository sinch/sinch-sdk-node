import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getProjectIdFromConfig,
  initHttpClient,
  printFullResponse,
} from '../config';

(async () => {
  console.log('*******************');
  console.log('* HttpClient_Post *');
  console.log('*******************');

  const projectId = getProjectIdFromConfig();
  const phoneNumber = getPhoneNumberFromConfig();

  const httpClient = initHttpClient();
  // The body is sent untouched: serialize it yourself and set the matching content-type
  const response = await httpClient.post(
    `https://lookup.api.sinch.com/v2/projects/${projectId}/lookups`,
    JSON.stringify({ number: phoneNumber }),
    {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      options: { timeoutSeconds: 10 },
    },
  );

  const body = await response.content.asJson() as { number?: string; line?: { type?: string } };

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`[${response.status}] The phone number ${body.number} is of type '${body.line?.type}'`);
  } else {
    printFullResponse(body);
  }
})();
