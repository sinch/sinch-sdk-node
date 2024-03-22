import { initSmsServiceWithServicePlanId } from '../../../config';
import { create } from './create';

(async () => {
  const smsServiceWithServicePlanId = initSmsServiceWithServicePlanId();
  await create(smsServiceWithServicePlanId);
})();
