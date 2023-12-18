import { initSmsClient } from '../../../config';
import { replace } from './replace';

(async () => {
  const sinchSmsClient = initSmsClient();
  await replace(sinchSmsClient);
})();
