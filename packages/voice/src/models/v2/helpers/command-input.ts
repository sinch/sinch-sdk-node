import { SvamlCommand } from '../svaml-commands';
import { commandList, SvamlCommands } from './commands';
import type { CommandsSequenceCreator } from './command-sequence';

export type SequenceCallback = (sequence: CommandsSequenceCreator) => void;

/**
 * Commands for a nested handler.
 * A callback fills a sequence. One command, such as `Calls.hangup`, is stored
 * as a one-element list. An array is stored as given.
 */
export type CommandInput = SequenceCallback | SvamlCommands;

/**
 * Commands collected by a sequence that is still being filled by a callback.
 * Reading them here skips menu-reference checks. `build()` always checks.
 */
const collectedCommands = new WeakMap<CommandsSequenceCreator, SvamlCommand[]>();

export function trackSequence(sequence: CommandsSequenceCreator, commands: SvamlCommand[]): void {
  collectedCommands.set(sequence, commands);
}

export function collectCommands(build: SequenceCallback): SvamlCommand[] {
  // Loaded lazily so this module can be imported while the sequence class is still initializing.
  const { CommandsSequenceCreator } = require('./command-sequence') as typeof import('./command-sequence');
  const sequence = new CommandsSequenceCreator();
  build(sequence);
  return [...(collectedCommands.get(sequence) ?? [])];
}

export function resolveCommands(input: CommandInput): SvamlCommand[] {
  if (typeof input === 'function') {
    return collectCommands(input);
  }
  return commandList(input);
}

export function appendCommands(current: SvamlCommand[] | undefined, input: CommandInput): SvamlCommand[] {
  return [...(current ?? []), ...resolveCommands(input)];
}

function present(lists: Array<SvamlCommand[] | undefined>): SvamlCommand[][] {
  return lists.filter((commands): commands is SvamlCommand[] => commands !== undefined);
}

function menuItemCommands(command: SvamlCommand & { command: 'menu' }): SvamlCommand[][] {
  const lists: SvamlCommand[][] = [];
  for (const item of Object.values(command.menus)) {
    if (item.matches !== undefined) {
      for (const matchCommands of Object.values(item.matches)) {
        lists.push(matchCommands);
      }
    }
    if (item.onFail !== undefined) {
      lists.push(item.onFail);
    }
  }
  return lists;
}

function nestedCommandLists(command: SvamlCommand): SvamlCommand[][] {
  if (command.command === 'amd' && command.events !== undefined) {
    return present([
      command.events.onHuman,
      command.events.onMachine,
      command.events.onBeep,
      command.events.onUnknown,
    ]);
  }
  if (command.command === 'dial' && command.events !== undefined) {
    return present([
      command.events.onAnswer,
      command.events.onBusy,
      command.events.onReject,
      command.events.onTimeout,
      command.events.onHangup,
      command.events.onFailure,
    ]);
  }
  if (command.command === 'messages' && command.events?.onFinish !== undefined) {
    return [command.events.onFinish];
  }
  if (command.command === 'startRecording' && command.events !== undefined) {
    return present([
      command.events.onFinish,
      command.events.onFailure,
    ]);
  }
  return [];
}

/**
 * A `gotoMenu` target must be an item of the menu that contains it.
 * `startMenu` must be one of that menu's item names.
 */
export function assertMenuReferences(commands: SvamlCommand[], menuNames: ReadonlySet<string> | undefined): void {
  for (const command of commands) {
    if (command.command === 'gotoMenu') {
      if (menuNames === undefined || !menuNames.has(command.menuName)) {
        throw new Error(`gotoMenu "${command.menuName}" is not defined`);
      }
      continue;
    }
    if (command.command === 'menu') {
      const names = new Set(Object.keys(command.menus));
      if (!names.has(command.startMenu)) {
        throw new Error(`menu start "${command.startMenu}" is not defined`);
      }
      for (const itemCommands of menuItemCommands(command)) {
        assertMenuReferences(itemCommands, names);
      }
      continue;
    }
    for (const nested of nestedCommandLists(command)) {
      assertMenuReferences(nested, menuNames);
    }
  }
}
