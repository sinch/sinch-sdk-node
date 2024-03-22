import { initSmsServiceWithServicePlanId } from '../../../config';
import { get } from './get';

(async () => {
  const smsServiceWithServicePlanId = initSmsServiceWithServicePlanId();
  await get(smsServiceWithServicePlanId);
})();
