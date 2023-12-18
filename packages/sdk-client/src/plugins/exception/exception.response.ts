import { EmptyResponseError, RequestFailedError } from '../../api';
import { PluginRunner, ResponsePlugin, ResponsePluginContext } from '../core';

/**
 * Plugin to fire an exception on wrong response / data
 */
export class ExceptionResponse<
  V extends Record<string, any> | undefined = Record<string, any>,
> implements ResponsePlugin<V | Record<string, unknown>, V>
{
/**
 * Initialize an instance of the class, with an optional callback function for exception handling.
 *
 * @param {Function} [callback] - A function called in case of an exception. If provided, this function is responsible for throwing the exception or not.
 */
  constructor(private callback?: (res: V, error: Error | undefined) => V) {}

  public load(
    context: ResponsePluginContext,
  ): PluginRunner<V | Record<string, unknown>, V> {
    return {
      transform: (res: V) => {
        if (context.exception) {
          return res;
        }

        const errorContext = {
          apiName: context.apiName,
          operationId: context.operationId,
          url: context.url,
          origin: context.origin,
        };
        let error: Error | undefined;

        if (!context.response) {
          error = new EmptyResponseError(
            'Fail to Fetch',
            errorContext,
            undefined,
          );
        } else if (!context.response.ok) {
          error = new RequestFailedError<V>(
            context.response.statusText,
            context.response.status,
            errorContext,
            res,
          );
        } else if (!res) {
          res = {} as V;
          if (context.response.status !== 204 && context.response.status !== 200) {
            res = {} as V;
            error = new EmptyResponseError<V>(
              context.response.statusText,
              errorContext,
              res,
            );
          }
        }

        if (error) {
          if (this.callback) {
            return this.callback(res, error);
          } else {
            throw error;
          }
        }
        return res;
      },
    };
  }
}
