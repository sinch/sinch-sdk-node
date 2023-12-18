import { initSmsClient } from '../../../config';
import { update } from './update';

(async () => {
  const sinchSmsClient = initSmsClient();
  await update(sinchSmsClient);
})();
