import { VoiceName } from '../voice-name';
import { InputMethodsEnum, MenuItem } from '../menu-item';
import { MenuPrompt } from '../menu-prompt';
import { GotoMenuCommand } from '../svaml-commands/goto-menu-command';
import { MenuCommand } from '../svaml-commands/menu-command';
import { SvamlCommand } from '../svaml-commands';
import { appendCommands, assertMenuReferences, CommandInput } from './command-input';
import { playMessage, sayMessage } from './message-content';

/**
 * Builds a menu prompt from stacked `text`, `ssml`, and `play` messages.
 * `text` is plain text. Use `ssml` for SSML.
 */
export class PromptCreator {
  private readonly messages: MenuPrompt['messages'] = [];
  private bargeIn: boolean | undefined;

  allowBargeIn(allowBargeIn: boolean): this {
    this.bargeIn = allowBargeIn;
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

  /** Adds a play message. */
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
  private readonly matches: { [key: string]: SvamlCommand[] } = Object.create(null);
  private onFailureCommands: SvamlCommand[] | undefined;

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
  match(expression: string, build: CommandInput): this {
    this.matches[expression] = appendCommands(this.matches[expression], build);
    return this;
  }

  /** Maps to `onFailure` on the menu item. */
  onFailure(build: CommandInput): this {
    this.onFailureCommands = appendCommands(this.onFailureCommands, build);
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
    if (this.onFailureCommands !== undefined) {
      item.onFailure = this.onFailureCommands;
    }
    return item;
  }
}

function buildItem(itemCreator: (creator: MenuItemCreator) => void): MenuItem {
  const item = new MenuItemCreator();
  itemCreator(item);
  return item.build();
}

function resolveItem(value: MenuItem | ((item: MenuItemCreator) => void)): MenuItem {
  if (typeof value === 'function') {
    return buildItem(value);
  }
  return value;
}

/**
 * Builds a `menu` command.
 */
export class MenuCreator {
  private start: string | undefined;
  private readonly items: { [key: string]: MenuItem } = Object.create(null);

  /** Maps to `startMenu` on the menu command. */
  name(name: string): this {
    this.start = name;
    return this;
  }

  /** Adds a menu item, from a callback or a prebuilt {@link Menu.item}. */
  item(name: string, value: MenuItem | ((item: MenuItemCreator) => void)): this {
    if (this.items[name] !== undefined) {
      throw new Error(`menu item "${name}" is already defined`);
    }
    this.items[name] = resolveItem(value);
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

function gotoMenuCommand(name: string): GotoMenuCommand {
  return {
    command: 'gotoMenu',
    menuName: name,
  };
}

/**
 * Builds one menu command, a menu prompt, a menu item, or a `gotoMenu` command.
 */
export const Menu = {
  /**
   * Builds one `menu` command.
   * `name` is written to `startMenu`. The callback adds the menu items.
   */
  create(build: (creator: MenuCreator) => void): MenuCommand {
    const creator = new MenuCreator();
    build(creator);
    return creator.build();
  },

  /**
   * Builds a menu prompt from stacked `text`, `ssml`, and `play` messages.
   * `text` is plain text.
   */
  prompt(build: (creator: PromptCreator) => void): MenuPrompt {
    return buildPrompt(build);
  },

  /**
   * Builds a menu item that can be reused across menus with {@link MenuCreator.item}.
   */
  item(build: (creator: MenuItemCreator) => void): MenuItem {
    return buildItem(build);
  },

  /**
   * Switches to another item of the menu that contains this command.
   * `name` is written to `menuName`.
   */
  goto(name: string): GotoMenuCommand {
    return gotoMenuCommand(name);
  },
};
