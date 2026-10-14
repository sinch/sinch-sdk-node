import { AmdCommand } from '../svaml-commands/amd-command';
import { AmdEvents } from '../svaml-commands/amd-command/amd-events';
import { appendCommands, CommandInput, resolveCommands } from './command-input';

/** Event handlers for one `amd` command. Each accepts one command, a list, or a sequence callback. */
export interface AmdParameters {
  /** Commands to run when a human answers. */
  onHuman?: CommandInput;
  /** Commands to run when a machine answers. */
  onMachine?: CommandInput;
  /** Commands to run when a beep is detected. */
  onBeep?: CommandInput;
  /** Commands to run when the result is unknown. */
  onUnknown?: CommandInput;
}

function amdCommand(events: AmdEvents): AmdCommand {
  const command: AmdCommand = {
    command: 'amd',
  };
  if (Object.keys(events).length > 0) {
    command.events = events;
  }
  return command;
}

function eventsFromParameters(parameters?: AmdParameters): AmdEvents {
  const events: AmdEvents = {};
  if (parameters?.onHuman !== undefined) {
    events.onHuman = resolveCommands(parameters.onHuman);
  }
  if (parameters?.onMachine !== undefined) {
    events.onMachine = resolveCommands(parameters.onMachine);
  }
  if (parameters?.onBeep !== undefined) {
    events.onBeep = resolveCommands(parameters.onBeep);
  }
  if (parameters?.onUnknown !== undefined) {
    events.onUnknown = resolveCommands(parameters.onUnknown);
  }
  return events;
}

/**
 * Builds an `amd` command. Event callbacks stack commands each time they are called.
 */
export class AmdCreator {
  private readonly events: AmdEvents = {};

  onHuman(build: CommandInput): this {
    this.events.onHuman = appendCommands(this.events.onHuman, build);
    return this;
  }

  onMachine(build: CommandInput): this {
    this.events.onMachine = appendCommands(this.events.onMachine, build);
    return this;
  }

  onBeep(build: CommandInput): this {
    this.events.onBeep = appendCommands(this.events.onBeep, build);
    return this;
  }

  onUnknown(build: CommandInput): this {
    this.events.onUnknown = appendCommands(this.events.onUnknown, build);
    return this;
  }

  build(): AmdCommand {
    return amdCommand(this.events);
  }
}

/**
 * Builds one answering-machine detection command.
 */
export const Amd = {
  /**
   * Runs answering-machine detection.
   * Each event handler accepts one command, a list, or a sequence callback.
   */
  activate(parameters?: AmdParameters): AmdCommand {
    return amdCommand(eventsFromParameters(parameters));
  },
};
