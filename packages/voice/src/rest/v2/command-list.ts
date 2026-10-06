import { SvamlCommand } from '../../models/v2';

/** One SVAML command, or the ordered list the Voice API expects. */
export type SvamlCommands = SvamlCommand | SvamlCommand[];

/** The Voice API accepts only an array. A single command is sent as a one-element list. */
export function commandList(commands: SvamlCommands): SvamlCommand[] {
  return Array.isArray(commands) ? commands : [commands];
}

export function stringifyCommandsBody<T extends { commands: SvamlCommands }>(body: T): string {
  return JSON.stringify({
    ...body,
    commands: commandList(body.commands),
  });
}
