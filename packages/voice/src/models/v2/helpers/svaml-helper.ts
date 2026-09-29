import { CallDestination } from '../call-destination';
import { CallOrigin } from '../call-origin';
import { FormatEnum, Say } from '../say';
import { MenuItem, InputMethodsEnum } from '../menu-item';
import { MenuPrompt } from '../menu-prompt';
import { Message } from '../message';
import { PlayMessage } from '../play-message';
import { RecordingDestinationType } from '../recording-destination-type';
import { RecordingFormatType } from '../recording-format-type';
import { RecordingType } from '../recording-type';
import { SayMessage } from '../say-message';
import { TranscriptionOptions } from '../transcription-options';
import {
  AmdCommand,
  AmdEvents,
  AnswerCommand,
  BridgeCallCommand,
  CallEvents,
  DialCommand,
  FlagsEnum,
  GotoMenuCommand,
  HangupCommand,
  MenuCommand,
  MessageEvents,
  MessagesCommand,
  PauseCommand,
  RecordingEvents,
  StartRecordingCommand,
  StopMessagesCommand,
  StopRecordingCommand,
  SvamlCommand,
  WebhookCommand,
} from '../svaml-commands';

export type SequenceCallback = (sequence: CommandsSequenceCreator) => void;

/**
 * Depth of sequence callbacks that are still collecting commands.
 * Those temporary sequences skip menu-reference checks: the enclosing menu
 * validates once every item has been registered.
 */
let nestedSequenceDepth = 0;

function collectCommands(build: SequenceCallback): SvamlCommand[] {
  const sequence = new CommandsSequenceCreator();
  nestedSequenceDepth += 1;
  try {
    build(sequence);
    return sequence.build();
  } finally {
    nestedSequenceDepth -= 1;
  }
}

function appendCommands(current: SvamlCommand[] | undefined, build: SequenceCallback): SvamlCommand[] {
  return [...(current ?? []), ...collectCommands(build)];
}

function present(lists: Array<SvamlCommand[] | undefined>): SvamlCommand[][] {
  return lists.filter((commands): commands is SvamlCommand[] => commands !== undefined);
}

function menuItemCommands(command: MenuCommand): SvamlCommand[][] {
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
function assertMenuReferences(commands: SvamlCommand[], menuNames: ReadonlySet<string> | undefined): void {
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

function sayMessage(text: string, voiceName: string, format?: FormatEnum): SayMessage {
  const say: Say = {
    text,
    voiceName,
  };
  if (format !== undefined) {
    say.format = format;
  }
  return {
    type: 'SAY',
    say,
  };
}

function playMessage(url: string): PlayMessage {
  return {
    type: 'PLAY',
    play: {
      url,
    },
  };
}

/**
 * Builds a menu prompt from stacked `text` and `play` messages.
 */
export class PromptCreator {
  private readonly messages: Message[] = [];
  private bargeIn: boolean | undefined;

  allowBargeIn(allowBargeIn: boolean): this {
    this.bargeIn = allowBargeIn;
    return this;
  }

  /** Adds a Say text message. */
  text(text: string, voiceName: string, format?: FormatEnum): this {
    this.messages.push(sayMessage(text, voiceName, format));
    return this;
  }

  /** Adds a Say play message. */
  play(url: string): this {
    this.messages.push(playMessage(url));
    return this;
  }

  build(): MenuPrompt {
    if (this.messages.length === 0) {
      throw new Error('prompt requires at least one text or play message');
    }
    const prompt: MenuPrompt = {
      messages: [...this.messages],
    };
    if (this.bargeIn !== undefined) {
      prompt.allowBargeIn = this.bargeIn;
    }
    return prompt;
  }
}

function buildPrompt(promptCreator: (creator: PromptCreator) => void): MenuPrompt {
  const prompt = new PromptCreator();
  promptCreator(prompt);
  return prompt.build();
}

function resolvePrompt(value: MenuPrompt | ((prompt: PromptCreator) => void)): MenuPrompt {
  if (typeof value === 'function') {
    return buildPrompt(value);
  }
  return value;
}

/**
 * Builds an `amd` command. Event callbacks stack commands each time they are called.
 */
export class AmdCreator {
  private readonly events: AmdEvents = {};

  onHuman(build: SequenceCallback): this {
    this.events.onHuman = appendCommands(this.events.onHuman, build);
    return this;
  }

  onMachine(build: SequenceCallback): this {
    this.events.onMachine = appendCommands(this.events.onMachine, build);
    return this;
  }

  onBeep(build: SequenceCallback): this {
    this.events.onBeep = appendCommands(this.events.onBeep, build);
    return this;
  }

  onUnknown(build: SequenceCallback): this {
    this.events.onUnknown = appendCommands(this.events.onUnknown, build);
    return this;
  }

  build(): AmdCommand {
    const command: AmdCommand = {
      command: 'amd',
    };
    if (Object.keys(this.events).length > 0) {
      command.events = this.events;
    }
    return command;
  }
}

/**
 * Builds a `dial` command. `to` is required.
 */
export class DialCreator {
  private toDestination: CallDestination | undefined;
  private fromOrigin: CallOrigin | undefined;
  private callNameValue: string | undefined;
  private dialTimeout: number | undefined;
  private maxDuration: number | undefined;
  private readonly events: CallEvents = {};

  to(to: CallDestination): this {
    this.toDestination = to;
    return this;
  }

  from(from: CallOrigin): this {
    this.fromOrigin = from;
    return this;
  }

  /** Maps to `callName` on the dial command. */
  name(name: string): this {
    this.callNameValue = name;
    return this;
  }

  /** Maps to `dialTimeoutDurationSeconds` on the dial command. */
  timeoutDuration(seconds: number): this {
    this.dialTimeout = seconds;
    return this;
  }

  /** Maps to `maxCallDurationSeconds` on the dial command. */
  maxDurationSeconds(seconds: number): this {
    this.maxDuration = seconds;
    return this;
  }

  onAnswer(build: SequenceCallback): this {
    this.events.onAnswer = appendCommands(this.events.onAnswer, build);
    return this;
  }

  onBusy(build: SequenceCallback): this {
    this.events.onBusy = appendCommands(this.events.onBusy, build);
    return this;
  }

  onReject(build: SequenceCallback): this {
    this.events.onReject = appendCommands(this.events.onReject, build);
    return this;
  }

  onTimeout(build: SequenceCallback): this {
    this.events.onTimeout = appendCommands(this.events.onTimeout, build);
    return this;
  }

  onHangup(build: SequenceCallback): this {
    this.events.onHangup = appendCommands(this.events.onHangup, build);
    return this;
  }

  onFailure(build: SequenceCallback): this {
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
      command.from = this.fromOrigin;
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
 * Builds one menu step used by {@link MenuCreator.item}.
 */
export class MenuItemCreator {
  private promptValue: MenuPrompt | undefined;
  private repeatPromptValue: MenuPrompt | undefined;
  private inputTimeout: number | undefined;
  private repeatCountValue: number | undefined;
  private minimumLength: number | undefined;
  private maximumLength: number | undefined;
  private terminating: string | undefined;
  private methods: InputMethodsEnum[] | undefined;
  private readonly matches: { [key: string]: SvamlCommand[] } = {};
  private onFailCommands: SvamlCommand[] | undefined;

  prompt(value: MenuPrompt | ((prompt: PromptCreator) => void)): this {
    this.promptValue = resolvePrompt(value);
    return this;
  }

  repeatPrompt(value: MenuPrompt | ((prompt: PromptCreator) => void)): this {
    this.repeatPromptValue = resolvePrompt(value);
    return this;
  }

  inputTimeoutDurationSeconds(seconds: number): this {
    this.inputTimeout = seconds;
    return this;
  }

  repeatCount(count: number): this {
    this.repeatCountValue = count;
    return this;
  }

  minimumInputLength(length: number): this {
    this.minimumLength = length;
    return this;
  }

  maximumInputLength(length: number): this {
    this.maximumLength = length;
    return this;
  }

  terminatingSequence(sequence: string): this {
    this.terminating = sequence;
    return this;
  }

  inputMethods(inputMethods: InputMethodsEnum[]): this {
    this.methods = inputMethods;
    return this;
  }

  /** Stacks commands for one match expression. Calling again with the same expression appends. */
  match(expression: string, build: SequenceCallback): this {
    this.matches[expression] = appendCommands(this.matches[expression], build);
    return this;
  }

  onFail(build: SequenceCallback): this {
    this.onFailCommands = appendCommands(this.onFailCommands, build);
    return this;
  }

  build(): MenuItem {
    const item: MenuItem = {};
    if (this.promptValue !== undefined) {
      item.prompt = this.promptValue;
    }
    if (this.repeatPromptValue !== undefined) {
      item.repeatPrompt = this.repeatPromptValue;
    }
    if (this.inputTimeout !== undefined) {
      item.inputTimeoutDurationSeconds = this.inputTimeout;
    }
    if (this.repeatCountValue !== undefined) {
      item.repeatCount = this.repeatCountValue;
    }
    if (this.minimumLength !== undefined) {
      item.minimumInputLength = this.minimumLength;
    }
    if (this.maximumLength !== undefined) {
      item.maximumInputLength = this.maximumLength;
    }
    if (this.terminating !== undefined) {
      item.terminatingSequence = this.terminating;
    }
    if (this.methods !== undefined) {
      item.inputMethods = this.methods;
    }
    if (Object.keys(this.matches).length > 0) {
      item.matches = this.matches;
    }
    if (this.onFailCommands !== undefined) {
      item.onFail = this.onFailCommands;
    }
    return item;
  }
}

/**
 * Builds a `menu` command.
 */
export class MenuCreator {
  private start: string | undefined;
  private readonly items: { [key: string]: MenuItem } = {};

  /** Maps to `startMenu` on the menu command. */
  name(name: string): this {
    this.start = name;
    return this;
  }

  item(name: string, create: (item: MenuItemCreator) => void): this {
    if (this.items[name] !== undefined) {
      throw new Error(`menu item "${name}" is already defined`);
    }
    const item = new MenuItemCreator();
    create(item);
    this.items[name] = item.build();
    return this;
  }

  build(): MenuCommand {
    if (this.start === undefined) {
      throw new Error('menu requires name');
    }
    if (Object.keys(this.items).length === 0) {
      throw new Error('menu requires at least one item');
    }
    const command: MenuCommand = {
      command: 'menu',
      startMenu: this.start,
      menus: this.items,
    };
    assertMenuReferences([command], undefined);
    return command;
  }
}

/**
 * Builds a `messages` command, or a `stopMessages` command when `stop` is used.
 * `text` and `play` stack message items.
 */
export class MessageCreator {
  private readonly messages: Message[] = [];
  private name: string | undefined;
  private onFinishCommands: SvamlCommand[] | undefined;
  private stopName: string | undefined;
  private stopFlags: FlagsEnum | undefined;

  /**
   * Builds a `stopMessages` command instead of `messages`.
   * `name` is written to `messagesName`.
   */
  stop(name: string, flags?: FlagsEnum): this {
    this.stopName = name;
    this.stopFlags = flags;
    return this;
  }

  messagesName(name: string): this {
    this.name = name;
    return this;
  }

  text(text: string, voiceName: string, format?: FormatEnum): this {
    this.messages.push(sayMessage(text, voiceName, format));
    return this;
  }

  play(url: string): this {
    this.messages.push(playMessage(url));
    return this;
  }

  onFinish(build: SequenceCallback): this {
    this.onFinishCommands = appendCommands(this.onFinishCommands, build);
    return this;
  }

  build(): MessagesCommand | StopMessagesCommand {
    if (this.stopName !== undefined) {
      const command: StopMessagesCommand = {
        command: 'stopMessages',
        messagesName: this.stopName,
      };
      if (this.stopFlags !== undefined) {
        command.flags = this.stopFlags;
      }
      return command;
    }
    if (this.messages.length === 0) {
      throw new Error('messages requires at least one text or play message');
    }
    const command: MessagesCommand = {
      command: 'messages',
      messages: [...this.messages],
    };
    if (this.name !== undefined) {
      command.messagesName = this.name;
    }
    if (this.onFinishCommands !== undefined) {
      const events: MessageEvents = {
        onFinish: this.onFinishCommands,
      };
      command.events = events;
    }
    return command;
  }
}

/**
 * Builds a `webhook` command. The sequence method is `customEvents`.
 */
export class CustomEventsCreator {
  private name: string | undefined;
  private urlValue: string | undefined;
  private fallback: string | undefined;

  webhookName(name: string): this {
    this.name = name;
    return this;
  }

  url(url: string): this {
    this.urlValue = url;
    return this;
  }

  fallbackUrl(url: string): this {
    this.fallback = url;
    return this;
  }

  build(): WebhookCommand {
    if (this.name === undefined || this.urlValue === undefined) {
      throw new Error('customEvents requires webhookName and url');
    }
    const command: WebhookCommand = {
      command: 'webhook',
      webhookName: this.name,
      url: this.urlValue,
    };
    if (this.fallback !== undefined) {
      command.fallbackUrl = this.fallback;
    }
    return command;
  }
}

/**
 * Builds a `startRecording` command, or a `stopRecording` command when `stop` is used.
 */
export class RecordingCreator {
  private stopName: string | undefined;
  private name: string | undefined;
  private destinationValue: RecordingDestinationType | undefined;
  private url: string | undefined;
  private credentialsValue: string | undefined;
  private formatValue: RecordingFormatType | undefined;
  private typeValue: RecordingType | undefined;
  private transcription: TranscriptionOptions | undefined;
  private readonly events: RecordingEvents = {};

  /** Builds a `stopRecording` command instead of `startRecording`. */
  stop(recordingName: string): this {
    this.stopName = recordingName;
    return this;
  }

  recordingName(name: string): this {
    this.name = name;
    return this;
  }

  destination(destination: RecordingDestinationType): this {
    this.destinationValue = destination;
    return this;
  }

  destinationUrl(url: string): this {
    this.url = url;
    return this;
  }

  credentials(credentials: string): this {
    this.credentialsValue = credentials;
    return this;
  }

  format(format: RecordingFormatType): this {
    this.formatValue = format;
    return this;
  }

  recordingType(recordingType: RecordingType): this {
    this.typeValue = recordingType;
    return this;
  }

  transcriptionOptions(options: TranscriptionOptions): this {
    this.transcription = options;
    return this;
  }

  onFinish(build: SequenceCallback): this {
    this.events.onFinish = appendCommands(this.events.onFinish, build);
    return this;
  }

  onFailure(build: SequenceCallback): this {
    this.events.onFailure = appendCommands(this.events.onFailure, build);
    return this;
  }

  build(): StartRecordingCommand | StopRecordingCommand {
    if (this.stopName !== undefined) {
      return {
        command: 'stopRecording',
        recordingName: this.stopName,
      };
    }
    if (
      this.destinationValue === undefined
      || this.url === undefined
      || this.credentialsValue === undefined
    ) {
      throw new Error('recording requires destination, destinationUrl, and credentials');
    }
    const command: StartRecordingCommand = {
      command: 'startRecording',
      recordingOptions: {
        destination: this.destinationValue,
        destinationUrl: this.url,
        credentials: this.credentialsValue,
      },
    };
    if (this.formatValue !== undefined) {
      command.recordingOptions.format = this.formatValue;
    }
    if (this.typeValue !== undefined) {
      command.recordingOptions.recordingType = this.typeValue;
    }
    if (this.transcription !== undefined) {
      command.recordingOptions.transcriptionOptions = this.transcription;
    }
    if (this.name !== undefined) {
      command.recordingName = this.name;
    }
    if (Object.keys(this.events).length > 0) {
      command.events = this.events;
    }
    return command;
  }
}

export interface HangupParameters {
  /** Name of the call leg to end. Maps to `callName`. */
  name?: string;
}

/**
 * Commands sequence creator.
 *
 * Helper names follow the SVAML sequence creator: `amd`, `answer`, `bridgeCall`,
 * `customEvents`, `dial`, `hangup`, `menu`, `gotoMenu`, `messages`, `play`, `pause`,
 * `prompt`, `recording`, `text`, and `command`.
 *
 * Each command helper appends to the sequence and returns it.
 * `prompt` returns a {@link MenuPrompt} and does not append a command.
 */
export class CommandsSequenceCreator {
  private readonly commands: SvamlCommand[] = [];

  amd(amdCreator: (creator: AmdCreator) => void): this {
    const creator = new AmdCreator();
    amdCreator(creator);
    this.commands.push(creator.build());
    return this;
  }

  /** Appends an `answer` command. */
  answer(): this {
    const command: AnswerCommand = {
      command: 'answer',
    };
    this.commands.push(command);
    return this;
  }

  /** Appends a `bridgeCall` command. `name` is written to `bridgeName`. */
  bridgeCall(name: string): this {
    const command: BridgeCallCommand = {
      command: 'bridgeCall',
      bridgeName: name,
    };
    this.commands.push(command);
    return this;
  }

  customEvents(customEventsCreator: (creator: CustomEventsCreator) => void): this {
    const creator = new CustomEventsCreator();
    customEventsCreator(creator);
    this.commands.push(creator.build());
    return this;
  }

  dial(dialCreator: (creator: DialCreator) => void): this {
    const creator = new DialCreator();
    dialCreator(creator);
    this.commands.push(creator.build());
    return this;
  }

  /** Appends a `hangup` command. */
  hangup(parameters?: HangupParameters): this {
    const command: HangupCommand = {
      command: 'hangup',
    };
    if (parameters?.name !== undefined) {
      command.callName = parameters.name;
    }
    this.commands.push(command);
    return this;
  }

  menu(menuCreator: (creator: MenuCreator) => void): this {
    const creator = new MenuCreator();
    menuCreator(creator);
    this.commands.push(creator.build());
    return this;
  }

  /**
   * Appends a `gotoMenu` command. `name` is written to `menuName`.
   * The target must be an item of the menu that contains this command.
   */
  gotoMenu(name: string): this {
    const command: GotoMenuCommand = {
      command: 'gotoMenu',
      menuName: name,
    };
    this.commands.push(command);
    return this;
  }

  messages(messageCreator: (creator: MessageCreator) => void): this {
    const creator = new MessageCreator();
    messageCreator(creator);
    this.commands.push(creator.build());
    return this;
  }

  /**
   * Shortcut: appends a `messages` command with one play message.
   * `url` is required by the play message.
   */
  play(url: string): this {
    this.commands.push({
      command: 'messages',
      messages: [playMessage(url)],
    });
    return this;
  }

  /** Appends a `pause` command. `durationMilliseconds` is required by the command. */
  pause(durationMilliseconds: number): this {
    const command: PauseCommand = {
      command: 'pause',
      durationMilliseconds,
    };
    this.commands.push(command);
    return this;
  }

  /**
   * Returns a menu prompt. This does not append a command.
   * Pass the result to a menu item, or build the prompt on the item directly.
   */
  prompt(promptCreator: (creator: PromptCreator) => void): MenuPrompt {
    return buildPrompt(promptCreator);
  }

  recording(recordingCreator: (creator: RecordingCreator) => void): this {
    const creator = new RecordingCreator();
    recordingCreator(creator);
    this.commands.push(creator.build());
    return this;
  }

  /**
   * Shortcut: appends a `messages` command with one Say text message.
   * This is the simple say form described for the sequence creator.
   */
  text(text: string, voiceName: string, format?: FormatEnum): this {
    this.commands.push({
      command: 'messages',
      messages: [sayMessage(text, voiceName, format)],
    });
    return this;
  }

  /** Appends an existing command instance. */
  command(command: SvamlCommand): this {
    this.commands.push(command);
    return this;
  }

  build(): SvamlCommand[] {
    const commands = [...this.commands];
    if (nestedSequenceDepth === 0) {
      assertMenuReferences(commands, undefined);
    }
    return commands;
  }
}

