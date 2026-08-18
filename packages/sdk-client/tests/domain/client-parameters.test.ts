import { resolveClientParameters } from '../../src/logger';

describe('resolveClientParameters transport settings', () => {
  it('should default useSinchAuth to true and timeoutSeconds to 60', () => {
    const resolved = resolveClientParameters({});
    expect(resolved.useSinchAuth).toBe(true);
    expect(resolved.timeoutSeconds).toBe(60);
  });

  it('should respect explicit transport overrides including disabling timeout', () => {
    const resolved = resolveClientParameters({
      useSinchAuth: false,
      timeoutSeconds: 0,
    });
    expect(resolved.useSinchAuth).toBe(false);
    expect(resolved.timeoutSeconds).toBe(0);
  });

  it('should reject negative timeoutSeconds', () => {
    expect(() => resolveClientParameters({ timeoutSeconds: -1 }))
      .toThrow('Invalid configuration: "timeoutSeconds" must be a non-negative number');
  });

  it('should fill missing transport defaults when logger is already resolved', () => {
    const withLogger = resolveClientParameters({});
    const partial = {
      logger: withLogger.logger,
    };
    const reResolved = resolveClientParameters(partial);
    expect(reResolved.useSinchAuth).toBe(true);
    expect(reResolved.timeoutSeconds).toBe(60);
    expect(reResolved.logger).toBe(withLogger.logger);
  });
});
