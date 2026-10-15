import { SvamlCommand } from '../svaml-commands';

/** One SVAML command, or the ordered list the Voice API stores. */
export type SvamlCommands = SvamlCommand | SvamlCommand[];

/** A single command is stored as a one-element list. An array is stored as given. */
export function commandList(commands: SvamlCommands): SvamlCommand[] {
  return Array.isArray(commands) ? commands : [commands];
}
