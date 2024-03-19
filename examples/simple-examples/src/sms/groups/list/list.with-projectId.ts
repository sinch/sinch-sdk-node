import { initSmsServiceWithProjectId } from '../../../config';
import { list } from './list';

(async () => {
  const smsServiceWithProjectId = initSmsServiceWithProjectId();
  await list(smsServiceWithProjectId);
})();
