import type { ResolvedSinchClientParameters, SinchClientParameters } from '../domain';

export type LogMessage = string | (() => string);

export interface Logger {
  debug(message: LogMessage, ...meta: any[]): void;
  info(message: LogMessage, ...meta: any[]): void;
  warn(message: LogMessage, ...meta: any[]): void;
  error(message: LogMessage, ...meta: any[]): void;
}

const evaluateMessage = (message: LogMessage): string =>
  typeof message === 'function' ? message() : message;

export const CONSOLE_LOGGER: Logger = {
  debug: (message, ...meta) => console.debug(evaluateMessage(message), ...meta),
  info: (message, ...meta) => console.info(evaluateMessage(message), ...meta),
  warn: (message, ...meta) => console.warn(evaluateMessage(message), ...meta),
  error: (message, ...meta) => console.error(evaluateMessage(message), ...meta),
};

export const NOOP_LOGGER: Logger = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
};

const resolveBaseLogger = (logger?: Logger | null): Logger => {
  if (logger === null) {
    return NOOP_LOGGER;
  }
  if (logger === undefined) {
    return CONSOLE_LOGGER;
  }
  return logger;
};

export const resolveLogger = (logger?: Logger | null): Logger => {
  if (logger instanceof SinchLogger) {
    return logger;
  }
  return new SinchLogger(resolveBaseLogger(logger));
};

export const resolveClientParameters = (
  params: SinchClientParameters | ResolvedSinchClientParameters,
): ResolvedSinchClientParameters => {
  if (params.logger instanceof SinchLogger) {
    return params as ResolvedSinchClientParameters;
  }
  return {
    ...params,
    logger: resolveLogger(params.logger),
  };
};

export class SinchLogger implements Logger {
  constructor(private baseLogger: Logger) {}

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
