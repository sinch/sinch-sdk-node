import { initClient } from '../../../config';
import { replace } from './replace';

(async () => {
  const sinchClient = initClient();
  await replace(sinchClient);
})();
