import { initSmsServiceWithServicePlanId } from '../../../config';
import { list } from './list';

(async () => {
  const smsServiceWithServicePlanId = initSmsServiceWithServicePlanId();
  await list(smsServiceWithServicePlanId);
})();
