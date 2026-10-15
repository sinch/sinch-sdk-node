import { commandList, stringifyCommandsBody } from '../../../src/rest/v2/command-list';
import { Voice } from '../../../src';

describe('commandList', () => {
  const hangup = Voice.v2.Calls.hangup();

  it('should wrap a single command in an array', () => {
    expect(commandList(hangup)).toEqual([hangup]);
  });

  it('should leave an array of commands unchanged', () => {
    expect(commandList([hangup])).toEqual([hangup]);
  });

  it('should stringify a single command as a one-element list', () => {
    expect(stringifyCommandsBody({
      commands: hangup,
    })).toBe(JSON.stringify({
      commands: [hangup],
    }));
  });
});
