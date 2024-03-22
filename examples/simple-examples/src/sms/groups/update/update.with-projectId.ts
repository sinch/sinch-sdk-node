import { initSmsServiceWithProjectId } from '../../../config';
import { update } from './update';

(async () => {
  const smsServiceWithProjectId = initSmsServiceWithProjectId();
  await update(smsServiceWithProjectId);
})();
