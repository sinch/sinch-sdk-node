import { Logger, CONSOLE_LOGGER, NOOP_LOGGER, resolveLogger, SinchLogger } from '../../src/logger';

describe('resolveLogger', () => {
  it('should return CONSOLE_LOGGER when logger is undefined', () => {
    expect(resolveLogger(undefined)).toBe(CONSOLE_LOGGER);
  });

  it('should return NOOP_LOGGER when logger is null', () => {
    expect(resolveLogger(null)).toBe(NOOP_LOGGER);
  });

  it('should return the provided logger instance', () => {
    const customLogger: Logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    expect(resolveLogger(customLogger)).toBe(customLogger);
  });
});

describe('NOOP_LOGGER', () => {
  it('should not invoke lazy message callbacks', () => {
    const callback = jest.fn(() => 'should not run');
    NOOP_LOGGER.debug(callback);
    NOOP_LOGGER.info(callback);
    NOOP_LOGGER.warn(callback);
    NOOP_LOGGER.error(callback);
    expect(callback).not.toHaveBeenCalled();
  });
});

describe('SinchLogger', () => {
  it('should prefix string messages', () => {
    const baseLogger: Logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const sinchLogger = new SinchLogger(baseLogger);
    sinchLogger.warn('test message');
    expect(baseLogger.warn).toHaveBeenCalledWith('[Sinch SDK][Warn] test message');
  });

  it('should pass lazy callbacks to the base logger without evaluating them upfront', () => {
    const baseLogger: Logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const sinchLogger = new SinchLogger(baseLogger);
    const callback = jest.fn(() => 'lazy message');
    sinchLogger.debug(callback);
    expect(callback).not.toHaveBeenCalled();
    expect(baseLogger.debug).toHaveBeenCalledWith(expect.any(Function));
    const passedCallback = (baseLogger.debug as jest.Mock).mock.calls[0][0] as () => string;
    expect(passedCallback()).toBe('[Sinch SDK][Debug] lazy message');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should allow level-aware loggers to skip lazy callback evaluation', () => {
    const callback = jest.fn(() => 'lazy message');
    const levelAwareLogger: Logger = {
      debug: () => {},
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    new SinchLogger(levelAwareLogger).debug(callback);
    expect(callback).not.toHaveBeenCalled();
  });
});
