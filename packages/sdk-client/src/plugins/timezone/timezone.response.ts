import { ResponsePlugin, ResponsePluginContext } from '../core/response-plugin';
import { PluginRunner } from '../core';

const buggyOperationIds: string[] = [
  'GetCallResult',
  'VerificationStatusById',
  'VerificationStatusByIdentity',
  'VerificationStatusByReference',
];

const buggyFields: Record<string, string>  = {
  'GetCallResult': 'timestamp',
  'VerificationStatusById': 'verificationTimestamp',
  'VerificationStatusByIdentity': 'verificationTimestamp',
  'VerificationStatusByReference': 'verificationTimestamp',
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
                let timestampValue = res[key] as string;
                // Check the formats +XX:XX, +XX and Z
                const timeZoneRegex = /([+-]\d{2}(:\d{2})|Z)$/;
                if (!timeZoneRegex.test(timestampValue)) {
                  const hourMinutesTimezoneRegex = /([+-]\d{2})$/;
                  // A timestamp with no minutes in the timezone cannot be converted into a Date => assume it's :00
                  if (hourMinutesTimezoneRegex.test(timestampValue)) {
                    timestampValue = timestampValue + ':00';
                  } else {
                    timestampValue = timestampValue + 'Z';
                  }
                }
                res[key] = timestampValue;
              }
            }
          }
        }
        return res;
      },
    };
  }

}
