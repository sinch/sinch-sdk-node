import { initClient } from '../../../config';
import { list } from './list';

(async () => {
  const sinchClient = initClient();
  await list(sinchClient);
})();
