import { initSmsServiceWithServicePlanId } from '../../../config';
import { deleteGroup } from './delete';

(async () => {
  const smsServiceWithServicePlanId = initSmsServiceWithServicePlanId();
  await deleteGroup(smsServiceWithServicePlanId);
})();
