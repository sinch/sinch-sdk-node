import { getPrintFormat, getProjectIdFromConfig, initHttpClient, printFullResponse } from '../config';

(async () => {
  console.log('*******************');
  console.log('* HttpClient_Get  *');
  console.log('*******************');

  const projectId = getProjectIdFromConfig();

  const httpClient = initHttpClient();
  // URL and query string are sent untouched: encode them yourself if needed
  const response = await httpClient.get(
    `https://numbers.api.sinch.com/v1/projects/${projectId}/activeNumbers`,
    {
      queryParams: '?regionCode=US&type=LOCAL&pageSize=2',
      headers: { accept: 'application/json' },
    },
  );

  const body = await response.content.asJson() as { activeNumbers?: { phoneNumber: string }[] };

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`[${response.status}] Active numbers: ${body.activeNumbers?.map((n) => n.phoneNumber).join(', ')}`);
  } else {
    printFullResponse(body);
  }
})();
