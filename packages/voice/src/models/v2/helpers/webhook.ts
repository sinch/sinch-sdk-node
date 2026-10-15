import { WebhookCommand } from '../svaml-commands/webhook-command';

/** Parameters for one `webhook` command. `name` and `url` are required. */
export interface WebhookParameters {
  /** Name of the webhook event. Maps to `webhookName`. */
  name: string;
  /** URL of the webhook endpoint. */
  url: string;
  /** Fallback URL used when the primary URL fails. */
  fallbackUrl?: string;
}

function webhookCommand(parameters: WebhookParameters): WebhookCommand {
  const command: WebhookCommand = {
    command: 'webhook',
    webhookName: parameters.name,
    url: parameters.url,
  };
  if (parameters.fallbackUrl !== undefined) {
    command.fallbackUrl = parameters.fallbackUrl;
  }
  return command;
}

/**
 * Builds a `webhook` command.
 * `trigger` writes `name` to `webhookName`.
 */
export class WebhookCreator {
  private parameters: WebhookParameters | undefined;

  /**
   * Configures the mid-call webhook.
   * `name` is written to `webhookName`.
   */
  trigger(name: string, url: string, fallbackUrl?: string): this {
    this.parameters = {
      name,
      url,
      fallbackUrl,
    };
    return this;
  }

  build(): WebhookCommand {
    if (this.parameters === undefined) {
      throw new Error('webhook requires trigger');
    }
    return webhookCommand(this.parameters);
  }
}

/**
 * Builds one mid-call webhook command.
 */
export const Webhook = {
  /**
   * Triggers a mid-call webhook.
   * `name` is written to `webhookName`.
   */
  trigger(parameters: WebhookParameters): WebhookCommand {
    return webhookCommand(parameters);
  },
};
