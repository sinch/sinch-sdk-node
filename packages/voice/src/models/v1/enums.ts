export type {
  MethodEnum as CalloutRequestMethodEnum,
} from './callout-request/callout-request';
export type {
  TypeEnum as DestinationTypeEnum,
} from './destination/destination';
export type {
  DomainEnum as GetCallResponseObjDomainEnum,
  StatusEnum as GetCallResponseObjStatusEnum,
} from './get-call-response-obj/get-call-response-obj';
export type {
  CapabilityEnum as GetNumbersResponseObjNumbersInnerCapabilityEnum,
} from './get-numbers-response-obj-numbers-inner/get-numbers-response-obj-numbers-inner';
export type {
  NumberTypeEnum as GetQueryNumberNumberItemNumberTypeEnum,
} from './get-query-number-number-item/get-query-number-number-item';
export type {
  DomainEnum as TtsCalloutRequestDomainEnum,
} from './tts-callout-request/tts-callout-request';
export type {
  CapabilityEnum as UnassignNumbersCapabilityEnum,
} from './unassign-numbers/unassign-numbers';
export type {
  CapabilityEnum as UpdateNumbersCapabilityEnum,
} from './assign-numbers/assign-numbers';
export type {
  CommandEnum as ManageConferenceParticipantRequestCommandEnum,
  MohEnum as ManageConferenceParticipantRequestMohEnum,
} from './manage-conference-participant-request/manage-conference-participant-request';

export type ResultEnum = 'N/A' | 'ANSWERED' | 'BUSY' | 'NOANSWER' | 'FAILED';

export type ReasonEnum = 'N/A'
  | 'TIMEOUT'
  | 'CALLERHANGUP'
  | 'CALLEEHANGUP'
  | 'BLOCKED'
  | 'NOCREDITPARTNER'
  | 'MANAGERHANGUP'
  | 'CANCEL'
  | 'GENERALERROR';
