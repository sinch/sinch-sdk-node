/**
 * A log message as a string, or a function that returns one when the logger reads it.
 *
 * Pass a function to defer building the message; level-aware loggers can skip that work
 * when the level is disabled.
 */
export type LogMessage = string | (() => string);

/**
 * Logger interface for SDK log output.
 *
 * Pass any object implementing `debug`, `info`, `warn`, and `error` via the `logger`
 * option when initializing `SinchClient`. Messages use {@link LogMessage}.
 */
export interface Logger {
  /**
   * On failed HTTP responses (non-success status), the SDK logs the API name, operation,
   * status code, HTTP method, request URL, and response headers. Enable debug on your
   * logger to troubleshoot authentication issues, expired tokens, and other API errors.
   */
  debug(message: LogMessage, ...meta: any[]): void;

  /** Informational SDK messages, such as deprecation guidance for specific APIs. */
  info(message: LogMessage, ...meta: any[]): void;

  /**
   * Deprecation notices and configuration warnings (for example conflicting credentials
   * or deprecated region parameters).
   */
  warn(message: LogMessage, ...meta: any[]): void;

  /** SDK-level errors surfaced during client initialization or configuration. */
  error(message: LogMessage, ...meta: any[]): void;
}
