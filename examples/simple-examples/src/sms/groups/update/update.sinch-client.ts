import { initClient } from '../../../config';
import { update } from './update';

(async () => {
  const sinchClient = initClient();
  await update(sinchClient);
})();
