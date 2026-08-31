import { MenuItem } from '../menu-item';

/**
 * Defines a set of named menus and executes them starting from startMenu. This is a blocking command — execution waits for the menu to complete before proceeding to the next command.  Each menu item configures prompts, input collection, timeout handling, and repeat behavior.
 */
export interface MenuCommand {
  /** Executes menu-based input collection using the configured menu definitions. */
  command: CommandEnum;
  /** Name of the menu to execute first. Must match a key in menus. */
  startMenu: string;
  /** Map of menu definitions keyed by menu name. */
  menus: { [key: string]: MenuItem };
}
export type CommandEnum = 'menu' | string;
