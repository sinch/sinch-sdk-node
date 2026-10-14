import { VoiceName } from '../voice-name';
import { Message } from '../message';
import { MessageEvents } from '../svaml-commands/messages-command/message-events';
import { MessagesCommand } from '../svaml-commands/messages-command';
import { StopMessagesCommand } from '../svaml-commands/stop-messages-command';
import { SvamlCommand } from '../svaml-commands';
import { appendCommands, CommandInput, resolveCommands } from './command-input';
import { playMessage, sayMessage } from './message-content';

/**
 * Optional fields for a one-message `text`, `ssml`, or `play` shortcut.
 * `name` is written to `messagesName`.
 */
export interface MessagesShortcutOptions {
  /** Maps to `messagesName` on the messages command. */
  name?: string;
  /** Commands to run when playback finishes. One command, a list, or a sequence callback. */
  onFinish?: CommandInput;
}

/**
 * Builds a `messages` command.
 * `text` is plain text. Use `ssml` for SSML. `text`, `ssml`, and `play` stack message items.
 */
export class MessageCreator {
  private readonly messages: Message[] = [];
  private nameValue: string | undefined;
  private onFinishCommands: SvamlCommand[] | undefined;

  /** Maps to `messagesName` on the messages command. */
  name(name: string): this {
    this.nameValue = name;
    return this;
  }

  /** Adds a plain-text Say message. */
  text(text: string, voiceName: VoiceName): this {
    this.messages.push(sayMessage(text, voiceName));
    return this;
  }

  /** Adds a Say message with `format: 'SSML'`. */
  ssml(ssml: string, voiceName: VoiceName): this {
    this.messages.push(sayMessage(ssml, voiceName, 'SSML'));
    return this;
  }

  play(url: string): this {
    this.messages.push(playMessage(url));
    return this;
  }

  onFinish(build: CommandInput): this {
    this.onFinishCommands = appendCommands(this.onFinishCommands, build);
    return this;
  }

  build(): MessagesCommand {
    return messagesCommand(this.messages, {
      name: this.nameValue,
      onFinish: this.onFinishCommands,
    });
  }
}

function messagesCommand(
  messages: Message[],
  options?: {
    name?: string;
    onFinish?: SvamlCommand[];
  },
): MessagesCommand {
  if (messages.length === 0) {
    throw new Error('messages requires at least one text or play message');
  }
  const command: MessagesCommand = {
    command: 'messages',
    messages: [...messages],
  };
  if (options?.name !== undefined) {
    command.messagesName = options.name;
  }
  if (options?.onFinish !== undefined) {
    const events: MessageEvents = {
      onFinish: options.onFinish,
    };
    command.events = events;
  }
  return command;
}

function shortcutMessages(message: Message, options?: MessagesShortcutOptions): MessagesCommand {
  return messagesCommand([message], {
    name: options?.name,
    onFinish: options?.onFinish !== undefined ? resolveCommands(options.onFinish) : undefined,
  });
}

function stopMessagesCommand(name: string): StopMessagesCommand {
  return {
    command: 'stopMessages',
    messagesName: name,
  };
}

/**
 * Builds one messages command.
 * `text` is a plain-text shortcut. `ssml` is the SSML shortcut. `play` plays one file.
 * `start` stacks several messages. `stop` stops a named sequence.
 */
export const Messages = {
  /**
   * Plays one or more messages.
   * `name` is written to `messagesName`.
   */
  start(build: (creator: MessageCreator) => void): MessagesCommand {
    const creator = new MessageCreator();
    build(creator);
    return creator.build();
  },

  /**
   * Shortcut: one plain-text Say message.
   * `name` is written to `messagesName`.
   */
  text(text: string, voiceName: VoiceName, options?: MessagesShortcutOptions): MessagesCommand {
    return shortcutMessages(sayMessage(text, voiceName), options);
  },

  /**
   * Shortcut: one Say message with `format: 'SSML'`.
   * `name` is written to `messagesName`.
   */
  ssml(ssml: string, voiceName: VoiceName, options?: MessagesShortcutOptions): MessagesCommand {
    return shortcutMessages(sayMessage(ssml, voiceName, 'SSML'), options);
  },

  /**
   * Shortcut: one play message.
   * `name` is written to `messagesName`.
   */
  play(url: string, options?: MessagesShortcutOptions): MessagesCommand {
    return shortcutMessages(playMessage(url), options);
  },

  /** Stops a message sequence. `name` is written to `messagesName`. */
  stop(name: string): StopMessagesCommand {
    return stopMessagesCommand(name);
  },
};
