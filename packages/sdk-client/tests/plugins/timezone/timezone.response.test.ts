import { TimezoneResponse } from '../../../src';
import { ResponsePluginContext } from '../../../src/plugins/core/response-plugin';
import { Headers } from 'node-fetch';

describe('Timezone response plugin', () => {

  let context: ResponsePluginContext;
  const TIMESTAMP_WITH_MISSING_TIMEZONE = '2024-01-09T15:50:24.000';
  const TIMESTAMP_WITH_TIMEZONE = '2024-01-09T15:50:24.000Z';
  const TIMESTAMP_WITH_TIMEZONE_HOURS = '2024-01-09T15:50:24.000+00';
  const TIMESTAMP_WITH_TIMEZONE_HOURS_MINUTES = '2024-01-09T15:50:24.000+00:00';

  beforeEach(() => {
    context = {
      operationId: 'GetCallResult',
      apiName: '',
      url: '',
      requestOptions: {
        headers: new Headers(),
        basePath: '',
      },
    };
  });

  it('should update the timestamp if the timezone is missing', async () => {
    const apiResponse = {
      timestamp: TIMESTAMP_WITH_MISSING_TIMEZONE,
    };
    const plugin = new TimezoneResponse();
    const runner = plugin.load(context);
    const result = await runner.transform(apiResponse);

    expect(result.timestamp).toBe(TIMESTAMP_WITH_TIMEZONE);
  });

  it('should NOT update the timestamp if the timezone is already there with "Z" format', async () => {
    const apiResponse = {
      timestamp: TIMESTAMP_WITH_TIMEZONE,
    };
    const plugin = new TimezoneResponse();
    const runner = plugin.load(context);
    const result = await runner.transform(apiResponse);

    expect(result.timestamp).toBe(TIMESTAMP_WITH_TIMEZONE);
  });

  it('should NOT update the timestamp if the timezone is already there with "+XX format"', async () => {
    const apiResponse = {
      timestamp: TIMESTAMP_WITH_TIMEZONE_HOURS,
    };
    const plugin = new TimezoneResponse();
    const runner = plugin.load(context);
    const result = await runner.transform(apiResponse);

    expect(result.timestamp).toBe(TIMESTAMP_WITH_TIMEZONE_HOURS);
  });

  it('should NOT update the timestamp if the timezone is already there with "+XX:XX format"', async () => {
    const apiResponse = {
      timestamp: TIMESTAMP_WITH_TIMEZONE_HOURS_MINUTES,
    };
    const plugin = new TimezoneResponse();
    const runner = plugin.load(context);
    const result = await runner.transform(apiResponse);

    expect(result.timestamp).toBe(TIMESTAMP_WITH_TIMEZONE_HOURS_MINUTES);
  });

  it('should NOT update the timestamp if the operationId if not listed', async () => {
    context.operationId = 'notListedAsBuggy';
    const apiResponse = {
      timestamp: TIMESTAMP_WITH_MISSING_TIMEZONE,
    };
    const plugin = new TimezoneResponse();
    const runner = plugin.load(context);
    const result = await runner.transform(apiResponse);

    expect(result.timestamp).toBe(TIMESTAMP_WITH_MISSING_TIMEZONE);
  });
});
