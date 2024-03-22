import { initSmsServiceWithServicePlanId } from '../../../config';
import { replace } from './replace';

(async () => {
  const smsServiceWithServicePlanId = initSmsServiceWithServicePlanId();
  await replace(smsServiceWithServicePlanId);
})();
