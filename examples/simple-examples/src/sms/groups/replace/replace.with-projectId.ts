import { initSmsServiceWithProjectId } from '../../../config';
import { replace } from './replace';

(async () => {
  const smsServiceWithProjectId = initSmsServiceWithProjectId();
  await replace(smsServiceWithProjectId);
})();
