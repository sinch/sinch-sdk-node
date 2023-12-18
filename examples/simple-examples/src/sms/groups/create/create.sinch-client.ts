import { initClient } from '../../../config';
import { create } from './create';

(async () => {
  const sinchClient = initClient();
  await create(sinchClient);
})();
