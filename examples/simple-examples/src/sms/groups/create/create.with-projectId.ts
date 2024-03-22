import { initSmsServiceWithProjectId } from '../../../config';
import { create } from './create';

(async () => {
  const smsServiceWithProjectId = initSmsServiceWithProjectId();
  await create(smsServiceWithProjectId);
})();
