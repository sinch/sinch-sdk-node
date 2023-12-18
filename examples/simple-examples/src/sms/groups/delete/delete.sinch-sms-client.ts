import { initSmsClient } from '../../../config';
import { deleteGroup } from './delete';

(async () => {
  const sinchSmsClient = initSmsClient();
  await deleteGroup(sinchSmsClient);
})();
