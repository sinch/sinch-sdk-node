import { ReasonEnum, VerificationStatusEnum } from '../enums';

export interface WhatsAppVerificationReportResponse {

  /** The unique ID of the verification request. */
  id?: string;
  /** The method of the verification request. This will always be `whatsapp`. */
  method?: 'whatsapp';
  /** The status of the verification request. */
  status?: VerificationStatusEnum;
  /** Displays the reason why a verification has `FAILED`, was `DENIED`, or was `ABORTED`. */
  reason?: ReasonEnum;
}
