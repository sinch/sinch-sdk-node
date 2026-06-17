import { Logger, NOOP_LOGGER, resolveLogger, SinchLogger } from '../../src/logger';

describe('resolveLogger', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should wrap CONSOLE_LOGGER when logger is undefined', () => {
    const logger = resolveLogger(undefined);
    expect(logger).toBeInstanceOf(SinchLogger);
    logger.warn('test');
    expect(console.warn).toHaveBeenCalledWith('[Sinch SDK][Warn] test');
  });

  it('should wrap NOOP_LOGGER when logger is null', () => {
    const logger = resolveLogger(null);
    expect(logger).toBeInstanceOf(SinchLogger);
    const callback = jest.fn(() => 'silent');
    logger.warn(callback);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should wrap the provided logger instance', () => {
    const customLogger: Logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const logger = resolveLogger(customLogger);
    expect(logger).toBeInstanceOf(SinchLogger);
    logger.warn('test message');
    expect(customLogger.warn).toHaveBeenCalledWith('[Sinch SDK][Warn] test message');
  });

  it('should return the same instance when logger is already resolved', () => {
    const logger = resolveLogger(undefined);
    expect(resolveLogger(logger)).toBe(logger);
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
