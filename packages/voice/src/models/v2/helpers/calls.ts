import { CallDestination } from '../call-destination';
import { CallOrigin } from '../call-origin';
import { AnswerCommand } from '../svaml-commands/answer-command';
import { BridgeCallCommand } from '../svaml-commands/bridge-call-command';
import { CallEvents } from '../svaml-commands/dial-command/call-events';
import { DialCommand } from '../svaml-commands/dial-command';
import { HangupCommand } from '../svaml-commands/hangup-command';
import { PauseCommand } from '../svaml-commands/pause-command';
import { BaseDestination } from './destination-helper';
import { appendCommands, CommandInput, resolveCommands } from './command-input';

export interface HangupParameters {
  /** Name of the call leg to end. Maps to `callName`. */
  name?: string;
}

/** Parameters for one `dial` command. `to` is required. */
export interface DialParameters {
  /** Call destination. */
  to: CallDestination;
  /** Call origin, or a {@link BaseDestination} from `Destination.of`. */
  from?: CallOrigin | BaseDestination;
  /** Name of the call leg. Maps to `callName`. */
  name?: string;
  /** Maps to `dialTimeoutDurationSeconds`. */
  timeoutDurationSeconds?: number;
  /** Maps to `maxCallDurationSeconds`. */
  maxDurationSeconds?: number;
  /** Commands to run when the call is answered. */
  onAnswer?: CommandInput;
  /** Commands to run when the call is busy. */
  onBusy?: CommandInput;
  /** Commands to run when the call is rejected. */
  onReject?: CommandInput;
  /** Commands to run when the call times out. */
  onTimeout?: CommandInput;
  /** Commands to run when the call is hung up. */
  onHangup?: CommandInput;
  /** Commands to run when the call fails. */
  onFailure?: CommandInput;
}

function hangupCommand(parameters?: HangupParameters): HangupCommand {
  const command: HangupCommand = {
    command: 'hangup',
  };
  if (parameters?.name !== undefined) {
    command.callName = parameters.name;
  }
  return command;
}

function answerCommand(): AnswerCommand {
  return { command: 'answer' };
}

function bridgeCallCommand(name: string): BridgeCallCommand {
  return {
    command: 'bridgeCall',
    bridgeName: name,
  };
}

function pauseCommand(durationMilliseconds: number): PauseCommand {
  return {
    command: 'pause',
    durationMilliseconds,
  };
}

function applyCallEvents(events: CallEvents, parameters: DialParameters): void {
  if (parameters.onAnswer !== undefined) {
    events.onAnswer = resolveCommands(parameters.onAnswer);
  }
  if (parameters.onBusy !== undefined) {
    events.onBusy = resolveCommands(parameters.onBusy);
  }
  if (parameters.onReject !== undefined) {
    events.onReject = resolveCommands(parameters.onReject);
  }
  if (parameters.onTimeout !== undefined) {
    events.onTimeout = resolveCommands(parameters.onTimeout);
  }
  if (parameters.onHangup !== undefined) {
    events.onHangup = resolveCommands(parameters.onHangup);
  }
  if (parameters.onFailure !== undefined) {
    events.onFailure = resolveCommands(parameters.onFailure);
  }
}

function dialCommand(parameters: DialParameters): DialCommand {
  const command: DialCommand = {
    command: 'dial',
    to: parameters.to,
  };
  if (parameters.from !== undefined) {
    command.from = parameters.from as CallOrigin;
  }
  if (parameters.name !== undefined) {
    command.callName = parameters.name;
  }
  if (parameters.timeoutDurationSeconds !== undefined) {
    command.dialTimeoutDurationSeconds = parameters.timeoutDurationSeconds;
  }
  if (parameters.maxDurationSeconds !== undefined) {
    command.maxCallDurationSeconds = parameters.maxDurationSeconds;
  }
  const events: CallEvents = {};
  applyCallEvents(events, parameters);
  if (Object.keys(events).length > 0) {
    command.events = events;
  }
  return command;
}

/**
 * Builds a `dial` command. `to` is required.
 */
export class DialCreator {
  private toDestination: CallDestination | undefined;
  private fromOrigin: CallOrigin | BaseDestination | undefined;
  private callNameValue: string | undefined;
  private dialTimeout: number | undefined;
  private maxDuration: number | undefined;
  private readonly events: CallEvents = {};

  to(to: CallDestination): this {
    this.toDestination = to;
    return this;
  }

  /** Accepts a call origin, or a {@link BaseDestination} from `Destination.of`. */
  from(from: CallOrigin | BaseDestination): this {
    this.fromOrigin = from;
    return this;
  }

  /** Maps to `callName` on the dial command. */
  name(name: string): this {
    this.callNameValue = name;
    return this;
  }

  /** Maps to `dialTimeoutDurationSeconds` on the dial command. */
  timeoutDurationSeconds(seconds: number): this {
    this.dialTimeout = seconds;
    return this;
  }

  /** Maps to `maxCallDurationSeconds` on the dial command. */
  maxDurationSeconds(seconds: number): this {
    this.maxDuration = seconds;
    return this;
  }

  onAnswer(build: CommandInput): this {
    this.events.onAnswer = appendCommands(this.events.onAnswer, build);
    return this;
  }

  onBusy(build: CommandInput): this {
    this.events.onBusy = appendCommands(this.events.onBusy, build);
    return this;
  }

  onReject(build: CommandInput): this {
    this.events.onReject = appendCommands(this.events.onReject, build);
    return this;
  }

  onTimeout(build: CommandInput): this {
    this.events.onTimeout = appendCommands(this.events.onTimeout, build);
    return this;
  }

  onHangup(build: CommandInput): this {
    this.events.onHangup = appendCommands(this.events.onHangup, build);
    return this;
  }

  onFailure(build: CommandInput): this {
    this.events.onFailure = appendCommands(this.events.onFailure, build);
    return this;
  }

  build(): DialCommand {
    if (this.toDestination === undefined) {
      throw new Error('dial requires to');
    }
    const command: DialCommand = {
      command: 'dial',
      to: this.toDestination,
    };
    if (this.fromOrigin !== undefined) {
      command.from = this.fromOrigin as CallOrigin;
    }
    if (this.callNameValue !== undefined) {
      command.callName = this.callNameValue;
    }
    if (this.dialTimeout !== undefined) {
      command.dialTimeoutDurationSeconds = this.dialTimeout;
    }
    if (this.maxDuration !== undefined) {
      command.maxCallDurationSeconds = this.maxDuration;
    }
    if (Object.keys(this.events).length > 0) {
      command.events = this.events;
    }
    return command;
  }
}

/**
 * Builds one call-control command.
 * Each method returns a single command. Pass it wherever a handler accepts one command
 * or a list, including request `commands` and nested handlers such as `onFinish`.
 */
export const Calls = {
  /** Answers the current call leg. */
  answer(): AnswerCommand {
    return answerCommand();
  },

  /** Joins a bridge. `name` is written to `bridgeName`. */
  bridgeCall(name: string): BridgeCallCommand {
    return bridgeCallCommand(name);
  },

  /**
   * Dials a new call leg.
   * `name` is written to `callName`. Event handlers accept one command, a list, or a sequence callback.
   */
  dial(parameters: DialParameters): DialCommand {
    return dialCommand(parameters);
  },

  /**
   * Ends a call leg.
   * `name` is written to `callName`. Omit it to end the current leg.
   */
  hangup(parameters?: HangupParameters): HangupCommand {
    return hangupCommand(parameters);
  },

  /** Pauses the sequence. `durationMilliseconds` is required by the command. */
  pause(durationMilliseconds: number): PauseCommand {
    return pauseCommand(durationMilliseconds);
  },
};
