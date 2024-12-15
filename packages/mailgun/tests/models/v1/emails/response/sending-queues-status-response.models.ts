import { Mailgun } from '../../../../../src';
import {
  SendingQueuesStatusResponseFromApi,
} from '../../../../../src/models/v1/emails/response/sending-queues-status-response/sending-queues-status-response';

export const sendingQueuesStatusResponseFromApi: SendingQueuesStatusResponseFromApi = {
  scheduled: {
    is_disabled: false,
    disabled: {
      reason: 'reason value',
      until: 'until value',
    },
  },
  regular: {
    is_disabled: false,
    disabled: {
      reason: 'reason value',
      until: 'until value',
    },
  },
};

export const sendingQueuesStatusResponse: Mailgun.SendingQueuesStatusResponse = {
  scheduled: {
    isDisabled: false,
    disabled: {
      reason: 'reason value',
      until: 'until value',
    },
  },
  regular: {
    isDisabled: false,
    disabled: {
      reason: 'reason value',
      until: 'until value',
    },
  },
};
