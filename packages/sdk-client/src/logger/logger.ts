export interface Logger {
  debug(message: string, ...meta: any[]): void;
  info(message: string, ...meta: any[]): void;
  warn(message: string, ...meta: any[]): void;
  error(message: string, ...meta: any[]): void;
}

export class SinchLogger implements Logger {
  constructor(private baseLogger: Logger) {}

  private format(level: string, message: string): string {
    return `[Sinch SDK][${level}] ${message}`;
  }

  debug(message: string, ...meta: any[]): void {
    this.baseLogger.debug(this.format('Debug', message), ...meta);
  }
  info(message: string, ...meta: any[]): void {
    this.baseLogger.info(this.format('Info', message), ...meta);
  }
  warn(message: string, ...meta: any[]): void {
    this.baseLogger.warn(this.format('Warn', message), ...meta);
  }
  error(message: string, ...meta: any[]): void {
    this.baseLogger.error(this.format('Error', message), ...meta);
  }
}
