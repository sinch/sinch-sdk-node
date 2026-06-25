import type { ResolvedSinchClientParameters, SinchClientParameters } from '../domain';
import type { Logger, LogMessage } from './logger-types';
import { isSinchLogger, SinchLogger } from './sinch-logger';

export type { LogMessage, Logger } from './logger-types';

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
  if (logger != null && isSinchLogger(logger)) {
    return logger;
  }
  return new SinchLogger(resolveBaseLogger(logger));
};

export const resolveClientParameters = (
  params: SinchClientParameters | ResolvedSinchClientParameters,
): ResolvedSinchClientParameters => {
  if (params.logger != null && isSinchLogger(params.logger)) {
    return params as ResolvedSinchClientParameters;
  }
  return {
    ...params,
    logger: resolveLogger(params.logger),
  };
};
