import { initSmsServiceWithProjectId } from '../../../config';
import { getPhoneNumbers } from './getPhoneNumbers';

(async () => {
  const smsServiceWithProjectId = initSmsServiceWithProjectId();
  await getPhoneNumbers(smsServiceWithProjectId);
})();
