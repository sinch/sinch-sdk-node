import { faxErrorCodeLabels, FaxErrorCodeEnum } from '../../../../src/models';

describe('faxErrorCodeLabels', () => {
  it('should have correct labels for each FaxErrorCodeEnum', () => {
    const expectedLabels = new Map<FaxErrorCodeEnum, string>([
      [6, 'There was an error communicating with the far side.'],
      [7, 'Far end cannot receive at the size of image'],
      [8, 'No response after sending a page'],
      [10, 'Disconnected after permitted retries'],
      [12, 'Received no response to DCS or TCF'],
      [13, 'Timed out waiting for the first message'],
      [14, 'Timed out waiting for initial communication'],
      [18, 'Unexpected message received'],
      [20, 'The HDLC carrier did not stop in a timely manner'],
      [21, 'Received a DCN from remote after sending a page'],
      [22, 'Received bad response to DCS or training'],
      [25, 'Far end cannot receive at the resolution of the image'],
      [26, 'The remote fax machine failed to respond'],
      [28, 'Failed to train with any of the compatible modems'],
      [29, 'Invalid response after sending a page'],
      [31, 'Fax machine incompatibility'],
      [38, 'The remote fax machine hung up before receiving fax'],
      [40, 'Telephony error'],
      [41, 'Unexpected DCN while waiting for DCS or DIS'],
      [44, 'Telephony Error'],
      // eslint-disable-next-line max-len
      [46, 'Insufficient funds to send fax and not able to auto recharge; There was a problem charging your credit card. Please check your payment information and try again.'],
      [48, 'No answer (The Receiving Machine May Be Out Of Paper)'],
      [53, 'Unexpected DCN after EOM or MPS sequence'],
      [60, 'Transmission error after page break'],
      [63, 'Fax protocol error'],
      [68, 'Far end is not compatible'],
      [75, 'Manually canceled by user'],
      [76, 'Canceled automatically because timeout exceeded'],
      [77, 'Timed out waiting for receiver ready (ECM mode)'],
      [79, 'Can\'t cancel the fax, it\'s already complete!'],
      [80, 'Received a DCN while waiting for a DIS'],
      [82, 'There was an error communicating with the far side'],
      [84, 'Unexpected command after page received'],
      [113, 'The file for this fax has been deleted or is not accessible.'],
      [117, 'No pages received'],
      [119, 'User requested simulated faxError'],
      [131, 'Incomplete transmission'],
      [132, 'No fax tone detected'],
      [133, 'Phone number is not permitted'],
    ]);

    for (const [code, label] of expectedLabels.entries()) {
      expect(faxErrorCodeLabels[code]).toBe(label);
    }
  });

  it('should not have a label for an undefined code', () => {
    expect(faxErrorCodeLabels[-1]).toBeUndefined();
  });
});
