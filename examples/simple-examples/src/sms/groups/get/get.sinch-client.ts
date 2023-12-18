import { initClient } from '../../../config';
import { get } from './get';

(async () => {
  const sinchClient = initClient();
  await get(sinchClient);
})();
