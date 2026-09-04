/**
 * Switches execution to another menu within the current menu context. The menu name must be a menu defined in the `menu` command. This is a blocking command — execution waits for the menu to complete before proceeding to the next command.  **Important**: this command can only be called within a menu execution context.
 */
export interface GotoMenuCommand {
  /** Switch execution to another menu within the current menu context. */
  command: CommandEnum;
  /** Name of the target menu to execute next. Must match a key in menus. */
  menuName: string;
}
export type CommandEnum = 'gotoMenu' | string;
