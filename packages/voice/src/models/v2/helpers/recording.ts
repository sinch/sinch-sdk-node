import { RecordingDestinationType } from '../recording-destination-type';
import { RecordingFormatType } from '../recording-format-type';
import { RecordingOptions } from '../recording-options';
import { RecordingType } from '../recording-type';
import { TranscriptionOptions } from '../transcription-options';
import { RecordingEvents } from '../svaml-commands/start-recording-command/recording-events';
import { StartRecordingCommand } from '../svaml-commands/start-recording-command';
import { StopRecordingCommand } from '../svaml-commands/stop-recording-command';
import { appendCommands, CommandInput, resolveCommands } from './command-input';

/** Parameters for {@link Recording.options}. `destination`, `url`, and `credentials` are required. */
export interface RecordingOptionsParameters {
  destination: RecordingDestinationType;
  url: string;
  credentials: string;
  format?: RecordingFormatType;
  recordingType?: RecordingType;
  transcriptionOptions?: TranscriptionOptions;
}

/** Optional fields for {@link Recording.start}. */
export interface StartRecordingParameters {
  /** Name of the recording. Maps to `recordingName`. */
  name?: string;
  /** Commands to run when the recording stops. */
  onFinish?: CommandInput;
  /** Commands to run when the recording fails to start. */
  onFailure?: CommandInput;
}

function recordingOptions(parameters: RecordingOptionsParameters): RecordingOptions {
  const options: RecordingOptions = {
    destination: parameters.destination,
    destinationUrl: parameters.url,
    credentials: parameters.credentials,
  };
  if (parameters.format !== undefined) {
    options.format = parameters.format;
  }
  if (parameters.recordingType !== undefined) {
    options.recordingType = parameters.recordingType;
  }
  if (parameters.transcriptionOptions !== undefined) {
    options.transcriptionOptions = parameters.transcriptionOptions;
  }
  return options;
}

function startRecordingCommand(
  options: RecordingOptions,
  parameters?: StartRecordingParameters,
): StartRecordingCommand {
  const command: StartRecordingCommand = {
    command: 'startRecording',
    recordingOptions: options,
  };
  if (parameters?.name !== undefined) {
    command.recordingName = parameters.name;
  }
  const events: RecordingEvents = {};
  if (parameters?.onFinish !== undefined) {
    events.onFinish = resolveCommands(parameters.onFinish);
  }
  if (parameters?.onFailure !== undefined) {
    events.onFailure = resolveCommands(parameters.onFailure);
  }
  if (Object.keys(events).length > 0) {
    command.events = events;
  }
  return command;
}

function stopRecordingCommand(name: string): StopRecordingCommand {
  return {
    command: 'stopRecording',
    recordingName: name,
  };
}

/**
 * Builds a `startRecording` command.
 * `options` sets destination, storage URL, credentials, and the optional format,
 * recording type, and transcription options in one call.
 */
export class RecordingCreator {
  private nameValue: string | undefined;
  private optionsValue: RecordingOptions | undefined;
  private readonly events: RecordingEvents = {};

  /** Maps to `recordingName` on the startRecording command. */
  name(name: string): this {
    this.nameValue = name;
    return this;
  }

  /**
   * Recording options for third-party storage.
   * `destination`, `url`, and `credentials` are required.
   * `url` is written to `destinationUrl`.
   */
  options(parameters: RecordingOptionsParameters): this {
    this.optionsValue = recordingOptions(parameters);
    return this;
  }

  onFinish(build: CommandInput): this {
    this.events.onFinish = appendCommands(this.events.onFinish, build);
    return this;
  }

  onFailure(build: CommandInput): this {
    this.events.onFailure = appendCommands(this.events.onFailure, build);
    return this;
  }

  build(): StartRecordingCommand {
    if (this.optionsValue === undefined) {
      throw new Error('recording requires options');
    }
    return startRecordingCommand(this.optionsValue, {
      name: this.nameValue,
      onFinish: this.events.onFinish,
      onFailure: this.events.onFailure,
    });
  }
}

/**
 * Builds recording options and the recording commands.
 * `options` returns the options object. `start` and `stop` each return one command.
 */
export const Recording = {
  /**
   * Recording options for third-party storage.
   * `url` is written to `destinationUrl`.
   */
  options(parameters: RecordingOptionsParameters): RecordingOptions {
    return recordingOptions(parameters);
  },

  /**
   * Starts a recording.
   * `name` is written to `recordingName`. `onFinish` and `onFailure` accept one command, a list, or a sequence callback.
   */
  start(options: RecordingOptions, parameters?: StartRecordingParameters): StartRecordingCommand {
    return startRecordingCommand(options, parameters);
  },

  /** Stops a recording. `name` is written to `recordingName`. */
  stop(name: string): StopRecordingCommand {
    return stopRecordingCommand(name);
  },
};
