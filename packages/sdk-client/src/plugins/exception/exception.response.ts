import { EmptyResponseError, RequestFailedError } from '../../api/api-errors';
import { PluginRunner } from '../core';
import { ResponsePlugin, ResponsePluginContext } from '../core/response-plugin';
import { Logger, SinchLogger } from '../../logger';

/**
 * Plugin to fire an exception on wrong response / data
 */
export class ExceptionResponse<
  V extends Record<string, any> | undefined = Record<string, any>,
> implements ResponsePlugin<V | Record<string, unknown>, V>
{
  private logger: SinchLogger;

  /**
 * Initialize an instance of the class, with an optional callback function for exception handling.
 *
 * @param {Function} [callback] - A function called in case of an exception. If provided, this function is responsible for throwing the exception or not.
 * @param {Logger} logger
 */
  constructor(
    private callback?: (res: V, error: Error | undefined) => V,
    logger: Logger = console,
  ) {
    this.logger = new SinchLogger(logger);
  }

  public load(
    context: ResponsePluginContext,
  ): PluginRunner<V | Record<string, unknown>, V> {
    return {
      transform: (res: V) => {
        this.debug(context);
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
          if (context.response.status !== 204
            && context.response.status !== 200
            && context.response.status !== 202
          ) {
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

  private debug(context: ResponsePluginContext) {
    if (!context.response?.ok) {
      this.logger.debug(
        `[${context.apiName}][${context.operationId}][${context.response?.status}]\nHTTP method: ${context.requestOptions.method}\nURL: ${context.url}\nResponse Headers: ${this.formatHeaders(context.response?.headers)}`,
      );
    }
  }

  private formatHeaders(headers: any) {
    if (!headers || typeof headers !== 'object') {
      return '';
    }

    return Object.entries(Object.fromEntries(headers.entries()))
      .map(([key, value]: [any, any]) => {
        if (value === undefined) { return `${key}=undefined`; }
        if (value === null) { return `${key}=null`; }
        if (typeof value === 'object') { return `${key}=${JSON.stringify(value)}`; }
        return `${key}=${String(value)}`;
      })
      .join(', ');
  }
}
