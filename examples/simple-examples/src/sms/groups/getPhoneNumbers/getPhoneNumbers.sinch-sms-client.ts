import { initSmsClient } from '../../../config';
import { getPhoneNumbers } from './getPhoneNumbers';

(async () => {
  const sinchSmsClient = initSmsClient();
  await getPhoneNumbers(sinchSmsClient);
})();
