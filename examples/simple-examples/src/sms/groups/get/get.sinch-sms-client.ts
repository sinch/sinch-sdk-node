import { initSmsClient } from '../../../config';
import { get } from './get';

(async () => {
  const sinchSmsClient = initSmsClient();
  await get(sinchSmsClient);
})();
