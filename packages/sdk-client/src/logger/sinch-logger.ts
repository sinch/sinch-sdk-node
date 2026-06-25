import type { Logger, LogMessage } from './logger-types';

const sinchLoggers = new WeakSet<Logger>();

export const isSinchLogger = (logger: Logger): boolean => sinchLoggers.has(logger);

export class SinchLogger implements Logger {
  constructor(private baseLogger: Logger) {
    sinchLoggers.add(this);
  }

  private format(level: string, message: string): string {
    return `[Sinch SDK][${level}] ${message}`;
  }

  private log(level: string, method: keyof Logger, message: LogMessage, ...meta: any[]): void {
    if (typeof message === 'function') {
      this.baseLogger[method](() => this.format(level, message()), ...meta);
    } else {
      this.baseLogger[method](this.format(level, message), ...meta);
    }
  }

  debug(message: LogMessage, ...meta: any[]): void {
    this.log('Debug', 'debug', message, ...meta);
  }
  info(message: LogMessage, ...meta: any[]): void {
    this.log('Info', 'info', message, ...meta);
  }
  warn(message: LogMessage, ...meta: any[]): void {
    this.log('Warn', 'warn', message, ...meta);
  }
  error(message: LogMessage, ...meta: any[]): void {
    this.log('Error', 'error', message, ...meta);
  }
}
