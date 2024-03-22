import { DownloadFaxContentRequestData } from '@sinch/sdk-core';
import { getFaxIdFromConfig, initFaxService } from '../../config';
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

  const faxService = initFaxService();
  const response = await faxService.faxes.downloadContent(requestData);

  const filePath = path.join('./fax-pdf', response.fileName);
  fs.writeFileSync(filePath, response.buffer);

  console.log('File successfully downloaded');
})();
