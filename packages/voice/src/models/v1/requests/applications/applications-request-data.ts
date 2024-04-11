import { UnassignNumbers } from '../../unassign-numbers';
import { UpdateCallbacks } from '../../update-callbacks';
import { AssignNumbers } from '../../assign-numbers';

export interface QueryNumberRequestData {
  /** The phone number you want to query. */
  'number': string;
}
export interface GetCallbackURLsRequestData {
  /** The unique identifying key of the application. */
  'applicationkey': string;
}
export interface GetNumbersRequestData {
}
export interface UnassignNumberRequestData {
  /**  */
  'unassignNumbersRequestBody'?: UnassignNumbers;
}
export interface UpdateCallbackURLsRequestData {
  /** The unique identifying key of the application. */
  'applicationkey': string;
  /**  */
  'updateCallbacksRequestBody'?: UpdateCallbacks;
}
export interface AssignNumbersRequestData {
  /**  */
  'assignNumbersRequestBody'?: AssignNumbers;
}
