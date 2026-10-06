import { commandList, SvamlCommands } from '../../models/v2/helpers/commands';

export type { SvamlCommands };
export { commandList };

export function stringifyCommandsBody<T extends { commands: SvamlCommands }>(body: T): string {
  return JSON.stringify({
    ...body,
    commands: commandList(body.commands),
  });
}
