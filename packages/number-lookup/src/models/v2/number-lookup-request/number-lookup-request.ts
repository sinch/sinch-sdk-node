import { RndFeatureOptions } from '../rnd-feature-options';
import { LookupFeature } from '../enums';

export interface NumberLookupRequest {
  /** MSISDN in E.164 format to query. */
  number: string;
  /** Contains requested features. Fallback to LineType if not provided. */
  features?: LookupFeature[];
  /** Required when RND feature is requested. */
  rndFeatureOptions?: RndFeatureOptions;
}
