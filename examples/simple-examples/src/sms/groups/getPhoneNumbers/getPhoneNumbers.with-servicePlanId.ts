import { initSmsServiceWithServicePlanId } from '../../../config';
import { getPhoneNumbers } from './getPhoneNumbers';

(async () => {
  const smsServiceWithServicePlanId = initSmsServiceWithServicePlanId();
  await getPhoneNumbers(smsServiceWithServicePlanId);
})();
