import { initSmsServiceWithServicePlanId } from '../../../config';
import { update } from './update';

(async () => {
  const smsServiceWithServicePlanId = initSmsServiceWithServicePlanId();
  await update(smsServiceWithServicePlanId);
})();
