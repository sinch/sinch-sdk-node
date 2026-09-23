import { CreateService } from '../../create-service';
import { UpdateService } from '../../update-service';

export interface ListServicesRequestData {
  /**
   * Filter services by name or description. Returns all services where either the name or
   * description contains the specified value (case-insensitive partial match).
   */
  'filter'?: string;
  /** Return the default service only. */
  'isDefault'?: boolean;
  /** Number of items to be returned on each page. */
  'pageSize'?: number;
  /** Page number (1-based) */
  'page'?: number;
}

export interface CreateServiceRequestData {
  /** Client-generated idempotency key to safely retry requests. The server uses this key to recognize retries of the same request. If a request with the same key is received within 10 minutes, the server returns the cached response from the original request. Using a random UUID (v4) is strongly recommended. If omitted, the SDK generates a UUID v4. */
  'Idempotency-Key'?: string;
  /** Request body for creating a new voice service. */
  'createServiceRequestBody': CreateService;
}

export interface GetServiceRequestData {
  /** The ID of the service. */
  'serviceId': string;
}

export interface UpdateServiceRequestData {
  /** The ID of the service. */
  'serviceId': string;
  /** Client-generated idempotency key to safely retry requests. The server uses this key to recognize retries of the same request. If a request with the same key is received within 10 minutes, the server returns the cached response from the original request. Using a random UUID (v4) is strongly recommended. If omitted, the SDK generates a UUID v4. */
  'Idempotency-Key'?: string;
  /** Request body for updating an existing voice service. */
  'updateServiceRequestBody'?: UpdateService;
}

export interface DeleteServiceRequestData {
  /** The ID of the service. */
  'serviceId': string;
}
