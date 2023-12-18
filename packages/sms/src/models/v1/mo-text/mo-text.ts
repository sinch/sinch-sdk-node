/**
 * Model: MOText
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { ApiMoMessage } from '../api-mo-message';

export interface MOText extends ApiMoMessage {

  body: string;
  /** Regular SMS */
  type: TypeEnum;
}

export type TypeEnum = 'mo_text';

