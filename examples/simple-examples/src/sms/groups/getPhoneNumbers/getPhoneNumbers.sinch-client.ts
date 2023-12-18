import { initClient } from '../../../config';
import { getPhoneNumbers } from './getPhoneNumbers';

(async () => {
  const sinchClient = initClient();
  await getPhoneNumbers(sinchClient);
})();
