import { DescribeSvamlRequest } from '../../describe-svaml-request';
import { ValidateSvamlRequest } from '../../validate-svaml-request';

export interface DescribeSvamlRequestData {
  /** Request payload for describing a SVAML document before using it in a call. */
  'describeSvamlRequestBody': DescribeSvamlRequest;
}

export interface ValidateSvamlRequestData {
  /** Request payload for validating a SVAML document before using it in a call. */
  'validateSvamlRequestBody': ValidateSvamlRequest;
}
