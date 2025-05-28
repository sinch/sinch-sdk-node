import { callErrorCodeLabels, CallErrorCodeEnum } from '../../../../src/models';

describe('callErrorCodeLabels', () => {
  it('should have correct labels for each CallErrorCodeEnum', () => {
    const expectedLabels = new Map<CallErrorCodeEnum, string>([
      [11, 'The call dropped prematurely'],
      [15, 'Congestion'],
      [16, 'Ring Timeout'],
      [17, 'Busy'],
      [19, 'Immediate Hangup'],
      [30, 'No answer from a fax machine.'],
      [32, 'Incompatible destination'],
      [34, 'Phone number not operational'],
      [43, 'Problem establishing connection'],
      [49, 'The destination phone number Is Not active'],
    ]);

    for (const [code, label] of expectedLabels.entries()) {
      expect(callErrorCodeLabels[code]).toBe(label);
    }
  });

  it('should not have a label for an undefined code', () => {
    expect(callErrorCodeLabels[-1]).toBeUndefined();
  });
});
