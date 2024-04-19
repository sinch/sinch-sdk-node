import { ActionEnum } from '../enums';

export interface FlashCallRequestEventResponse {

  /** Determines whether the verification can be executed. */
  action?: ActionEnum;
  /** @see FlashCallContent */
  flashCall?: FlashCallContent;
}

interface FlashCallContent {

  /** The phone number that will be displayed to the user when the flashcall is received on the user\'s phone. By default, the Sinch dashboard will randomly select the CLI that will be displayed during a flashcall from a pool of numbers. If you want to set your own CLI, you can specify it in the response to the Verification Request Event. */
  cli?: string;
  /** The maximum time that a flashcall verification will be active and can be completed. If the phone number hasn\'t been verified successfully during this time, then the verification request will fail. By default, the Sinch dashboard will automatically optimize dial time out during a flashcall. If you want to set your own dial time out for the flashcall, you can specify it in the response to the Verification Request Event. */
  dialTimeout?: number;
}
