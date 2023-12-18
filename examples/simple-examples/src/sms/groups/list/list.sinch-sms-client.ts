import { initSmsClient } from '../../../config';
import { list } from './list';

(async () => {
  const sinchSmsClient = initSmsClient();
  await list(sinchSmsClient);
})();
