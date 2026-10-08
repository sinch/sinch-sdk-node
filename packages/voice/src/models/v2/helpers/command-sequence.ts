import { MenuPrompt } from '../menu-prompt';
import { SvamlCommand } from '../svaml-commands';
import { AmdCreator } from './amd';
import { Calls, DialCreator, HangupParameters } from './calls';
import { assertMenuReferences, trackSequence } from './command-input';
import { Menu, MenuCreator, PromptCreator } from './menu';
import { MessageCreator, Messages, MessagesShortcutOptions } from './messages';
import { Recording, RecordingCreator } from './recording';
import { WebhookCreator } from './webhook';

/**
 * Commands sequence creator.
 *
 * Command helpers that return one command live beside this class:
 * {@link Amd}, {@link Calls}, {@link Menu}, {@link Messages}, {@link Recording}, and {@link Webhook}.
 *
 * Helper names on the sequence follow the SVAML sequence creator: `amd`, `answer`, `bridgeCall`,
 * `webhook`, `dial`, `hangup`, `menu`, `gotoMenu`, `messages`, `stopMessages`,
 * `play`, `pause`, `prompt`, `recording`, `stopRecording`, `text`, and `command`.
 *
 * Each command helper appends to the sequence and returns it.
 * `prompt` returns a {@link MenuPrompt} and does not append a command.
 * `text` is a plain-text shortcut. Use `messages` with `ssml` for SSML.
 */
export class CommandsSequenceCreator {
  private readonly commands: SvamlCommand[] = [];

  constructor() {
    trackSequence(this, this.commands);
  }

  amd(amdCreator: (creator: AmdCreator) => void): this {
    const creator = new AmdCreator();
    amdCreator(creator);
    this.commands.push(creator.build());
    return this;
  }

  /** Appends an `answer` command. */
  answer(): this {
    this.commands.push(Calls.answer());
    return this;
  }

  /** Appends a `bridgeCall` command. `name` is written to `bridgeName`. */
  bridgeCall(name: string): this {
    this.commands.push(Calls.bridgeCall(name));
    return this;
  }

  /** Appends a `webhook` command. */
  webhook(webhookCreator: (creator: WebhookCreator) => void): this {
    const creator = new WebhookCreator();
    webhookCreator(creator);
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
    this.commands.push(Calls.hangup(parameters));
    return this;
  }

  menu(menuCreator: (creator: MenuCreator) => void): this {
    this.commands.push(Menu.create(menuCreator));
    return this;
  }

  /**
   * Appends a `gotoMenu` command. `name` is written to `menuName`.
   * The target must be an item of the menu that contains this command.
   */
  gotoMenu(name: string): this {
    this.commands.push(Menu.goto(name));
    return this;
  }

  messages(messageCreator: (creator: MessageCreator) => void): this {
    this.commands.push(Messages.create(messageCreator));
    return this;
  }

  /** Appends a `stopMessages` command. `name` is written to `messagesName`. */
  stopMessages(name: string): this {
    this.commands.push(Messages.stop(name));
    return this;
  }

  /**
   * Shortcut: appends a `messages` command with one play message.
   * `url` is required by the play message.
   */
  play(url: string, options?: MessagesShortcutOptions): this {
    this.commands.push(Messages.play(url, options));
    return this;
  }

  /** Appends a `pause` command. `durationMilliseconds` is required by the command. */
  pause(durationMilliseconds: number): this {
    this.commands.push(Calls.pause(durationMilliseconds));
    return this;
  }

  /**
   * Returns a menu prompt. This does not append a command.
   * Pass the result to a menu item, or build the prompt on the item directly.
   * `text` on the prompt is plain text.
   */
  prompt(promptCreator: (creator: PromptCreator) => void): MenuPrompt {
    return Menu.prompt(promptCreator);
  }

  recording(recordingCreator: (creator: RecordingCreator) => void): this {
    const creator = new RecordingCreator();
    recordingCreator(creator);
    this.commands.push(creator.build());
    return this;
  }

  /** Appends a `stopRecording` command. `name` is written to `recordingName`. */
  stopRecording(name: string): this {
    this.commands.push(Recording.stop(name));
    return this;
  }

  /**
   * Shortcut: appends a `messages` command with one plain-text Say message.
   * SSML belongs on `messages` via `ssml`, not on this shortcut.
   */
  text(text: string, voiceName: string, options?: MessagesShortcutOptions): this {
    this.commands.push(Messages.text(text, voiceName, options));
    return this;
  }

  /** Appends an existing command instance. */
  command(command: SvamlCommand): this {
    this.commands.push(command);
    return this;
  }

  build(): SvamlCommand[] {
    const commands = [...this.commands];
    assertMenuReferences(commands, undefined);
    return commands;
  }
}
