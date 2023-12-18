import { initClient } from '../../../config';
import { deleteGroup } from './delete';

(async () => {
  const sinchClient = initClient();
  await deleteGroup(sinchClient);
})();
