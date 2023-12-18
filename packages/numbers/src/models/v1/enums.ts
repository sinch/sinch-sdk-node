export type { TypeEnum as BadRequestTypeEnum } from './bad-request/bad-request';
export type {
  CodeEnum as InternalErrorErrorCodeEnum,
  StatusEnum as InternalErrorErrorStatusEnum,
} from './internal-error-error/internal-error-error';
export type {
  CodeEnum as InvalidArgumentErrorCodeEnum,
  StatusEnum as InvalidArgumentErrorStatusEnum,
} from './invalid-argument-error/invalid-argument-error';
export type {
  CodeEnum as NotFoundErrorCodeEnum,
  StatusEnum as NotFoundErrorStatusEnum,
} from './not-found-error/not-found-error';

export type NumberTypeEnum =  'MOBILE' |'LOCAL' |'TOLL_FREE';

export type SearchPatternEnum = 'START' | 'CONTAINS' | 'END';

export type CapabilitiesEnum = 'SMS' | 'VOICE';
