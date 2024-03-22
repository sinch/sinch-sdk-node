import { initSmsServiceWithProjectId } from '../../../config';
import { get } from './get';

(async () => {
  const smsServiceWithProjectId = initSmsServiceWithProjectId();
  await get(smsServiceWithProjectId);
})();
