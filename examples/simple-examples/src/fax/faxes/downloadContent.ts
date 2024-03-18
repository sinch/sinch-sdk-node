import { DownloadFaxContentRequestData } from '@sinch/sdk-core';
import { getFaxIdFromConfig, initClient } from '../../config';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  console.log('******************');
  console.log('* getFaxFileById *');
  console.log('******************');

  const faxId = getFaxIdFromConfig();

  const requestData: DownloadFaxContentRequestData = {
    id: faxId,
    fileFormat: 'pdf',
  };

  const sinchClient = initClient();
  const response = await sinchClient.fax.faxes.downloadContent(requestData);

  const filePath = path.join('./fax-pdf', response.fileName);
  fs.writeFileSync(filePath, response.buffer);

  console.log('File successfully downloaded');
})();
