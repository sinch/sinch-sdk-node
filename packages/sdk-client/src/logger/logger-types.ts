export type LogMessage = string | (() => string);

export interface Logger {
  debug(message: LogMessage, ...meta: any[]): void;
  info(message: LogMessage, ...meta: any[]): void;
  warn(message: LogMessage, ...meta: any[]): void;
  error(message: LogMessage, ...meta: any[]): void;
}
