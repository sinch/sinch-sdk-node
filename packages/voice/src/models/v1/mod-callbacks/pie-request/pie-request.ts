/**
 * The request body of a Prompt Input Event.
 */
export interface PieRequest {

  /** Must have the value `pie`. */
  event?: 'pie';
  /** The unique ID assigned to this call. */
  callid?: string;
  /** The timestamp in UTC format. */
  timestamp?: Date;
  /** An object containing information about the returned menu result. */
  menuResult?: MenuResult;
  /** The current API version. */
  version?: number;
  /** A string that can be used to pass custom information related to the call. */
  custom?: string;
  /** The unique application key. You can find it in the Sinch [dashboard](https://dashboard.sinch.com/voice/apps). */
  applicationKey?: string;
}

export interface MenuResult {

  /** The ID of the menu that triggered the prompt input event. */
  menuId?: string;
  /** The type of information that's returned. */
  type?: string;
  /** The value of the returned information. */
  value?: string;
  /** The type of input received. */
  inputMethod?: string;
}
