export type {
  ActionEnum as CalloutRequestEventResponseActionEnum,
} from './callout-request-event-response/callout-request-event-response';
export type {
  ReasonEnum as CalloutVerificationReportResponseReasonEnum,
} from './callout-verification-report-response/callout-verification-report-response';
export type {
  ActionEnum as FlashCallRequestEventResponseActionEnum,
} from './flashcall-request-event-response/flashcall-request-event-response';
export type {
  ReasonEnum as FlashcallVerificationReportResponseReasonEnum,
  SourceEnum as FlashcallVerificationReportResponseSourceEnum,
} from './flashcall-verification-report-response/flashcall-verification-report-response';
export type { TypeEnum as IdentityTypeEnum } from './identity/identity';
export type {
  ActionEnum as SMSRequestEventResponseActionEnum,
} from './sms-request-event-response/sms-request-event-response';
export type {
  ReasonEnum as SMSVerificationReportResponseReasonEnum,
  SourceEnum as SMSVerificationReportResponseSourceEnum,
} from './sms-verification-report-response/sms-verification-report-response';
export type {
  MethodEnum as VerificationRequestEventMethodEnum,
} from './verification-request-event/verification-request-event';
export type {
  MethodEnum as VerificationResultEventMethodEnum,
  ReasonEnum as VerificationResultEventReasonEnum,
  SourceEnum as VerificationResultEventSourceEnum ,
} from './verification-result-event/verification-result-event';

export type VerificationStatusEnum = 'PENDING'
  | 'SUCCESSFUL'
  | 'FAIL'
  | 'DENIED'
  | 'ABORTED'
  | 'ERROR';
