import { ApiMoMessage } from '../api-mo-message';

export interface MOText extends ApiMoMessage {

  body: string;
  /** Regular SMS */
  type: 'mo_text';
}
