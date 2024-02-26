
/**
 * You can use the default created service, or create multiple services within the same project to have different default behavior for all your different faxing use cases.
 */
export interface ServiceRequest {

  /** A friendly name for the service. Maximum is 60 characters. */
  name?: string;
  /** The URL to which Sinch will post when someone sends a fax to your Sinch number. To accept incoming faxes this must be set and your Sinch phone number must be configured to receive faxes. */
  incomingWebhookUrl?: string;
  /** The content type of the webhook. */
  webhookContentType?: 'multipart/form-data' | 'application/json';
  /** If set to true this is the service used to create faxes when no serviceId is specified in the API endpoints. */
  defaultForProject?: boolean;
  /** One of your sinch numbers connected to this service or any of your verified numbers */
  defaultFrom?: string;
  /** The number of times to retry sending a fax if it fails. Default is 3. Maximum is 5. */
  numberOfRetries?: number;
  /** The number of seconds to wait between retries if the fax is not yet completed. */
  retryDelaySeconds?: number;
  /** Determines how documents are converted to black and white. Value should be halftone or monochrome. Defaults to value selected on Fax Settings page */
  imageConversionMethod?: 'HALFTONE' | 'MONOCHROME';
  /** Save fax documents with sinch when you send faxes */
  saveOutboundFaxDocuments?: boolean;
  /** Save fax documents with sinch when you receive faxes */
  saveInboundFaxDocuments?: boolean;
}

export interface ServiceResponse extends ServiceRequest {
  /** ID of the fax service used. */
  id?: string;
  /** The `Id` of the project associated with the call. */
  projectId?: string;
}
