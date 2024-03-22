import { initSmsServiceWithProjectId } from '../../../config';
import { deleteGroup } from './delete';

(async () => {
  const smsServiceWithProjectId = initSmsServiceWithProjectId();
  await deleteGroup(smsServiceWithProjectId);
})();
