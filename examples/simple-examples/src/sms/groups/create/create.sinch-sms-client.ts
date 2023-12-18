import { initSmsClient } from '../../../config';
import { create } from './create';

(async () => {
  const sinchSmsClient = initSmsClient();
  await create(sinchSmsClient);
})();
