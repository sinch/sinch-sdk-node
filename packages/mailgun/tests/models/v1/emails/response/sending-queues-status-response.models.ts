import { Mailgun } from '../../../../../src';

export const sendingQueuesStatusResponseFromApi: Mailgun.SendingQueuesStatusResponseFromApi = {
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
