import type { ResolvedSinchClientParameters, SinchClientParameters } from '../domain';
import { resolveTimeoutSeconds } from '../domain';
import type { Logger, LogMessage } from './logger-types';
import { isSinchLogger, SinchLogger } from './sinch-logger';

export type { LogMessage, Logger } from './logger-types';

const evaluateMessage = (message: LogMessage): string =>
  typeof message === 'function' ? message() : message;

/** @internal */
export const CONSOLE_LOGGER: Logger = {
  debug: (message, ...meta) => console.debug(evaluateMessage(message), ...meta),
  info: (message, ...meta) => console.info(evaluateMessage(message), ...meta),
  warn: (message, ...meta) => console.warn(evaluateMessage(message), ...meta),
  error: (message, ...meta) => console.error(evaluateMessage(message), ...meta),
};

/** @internal */
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

/** @internal */
export const resolveLogger = (logger?: Logger | null): Logger => {
  if (isSinchLogger(logger)) {
    return logger;
  }
  return new SinchLogger(resolveBaseLogger(logger));
};

/** @internal */
export const resolveClientParameters = (
  params: SinchClientParameters | ResolvedSinchClientParameters,
): ResolvedSinchClientParameters => {
  const useSinchAuth = params.useSinchAuth ?? true;
  const timeoutSeconds = resolveTimeoutSeconds(params.timeoutSeconds);
  const logger = isSinchLogger(params.logger) ? params.logger : resolveLogger(params.logger);

  if (
    logger === params.logger
    && params.useSinchAuth === useSinchAuth
    && params.timeoutSeconds === timeoutSeconds
  ) {
    return params as ResolvedSinchClientParameters;
  }

  return {
    ...params,
    logger,
    useSinchAuth,
    timeoutSeconds,
  };
};
