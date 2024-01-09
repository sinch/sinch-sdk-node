import { ResponsePlugin, ResponsePluginContext } from '../core/response-plugin';
import { PluginRunner } from '../core';

const buggyOperationIds: string[] = [
  'GetCallResult',
];

const buggyFields: Record<string, string>  = {
  'GetCallResult': 'timestamp',
};

export class TimezoneResponse<V extends Record<string, any> | undefined = Record<string, any>>
implements ResponsePlugin<V | Record<string, any>> {

  public load(
    context: ResponsePluginContext,
  ): PluginRunner<V | Record<string, unknown>, V> {
    return {
      transform(res: V) {
        // HACK to fix a server-side bug: the timestamp is returned without the timezone
        if (res && buggyOperationIds.includes(context.operationId) ) {
          for (const key in res) {
            if (Object.prototype.hasOwnProperty.call(res, key)) {
              const buggyKey = buggyFields[context.operationId];
              if (key === buggyKey && typeof res[buggyKey] === 'string') {
                const timestampValue = res[key] as string;
                const timeZoneRegex = /([+-]\d{2}:?\d{2}|Z)$/;
                if (!timeZoneRegex.test(timestampValue)) {
                  res[key] = timestampValue + 'Z';
                }
              }
            }
          }
        }
        return res;
      },
    };
  }

}
