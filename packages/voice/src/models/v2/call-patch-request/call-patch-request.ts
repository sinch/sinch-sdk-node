import { SvamlCommand } from '../svaml-commands';

/**
 * Request body for patching an ongoing call with SVAML commands.
 */
export interface CallPatchRequest {
  /** An ordered list of SVAML v2 (Sinch Voice Application Markup Language) commands that describe a call flow. Commands are executed sequentially in the order they are defined.  **Blocking vs. non-blocking:** Some commands block execution until they complete (`pause`, `webhook`, `menu`, `gotoMenu`), while others return immediately and run in parallel (`dial`, `messages`, `amd`, `answer`, `hangup`, `startRecording`, `stopRecording`, `bridgeCall`, `stopMessages`). Each command\'s description specifies its behavior.  **Nesting scope:** Commands that appear inside event handlers (e.g., `dial.events.onAnswer`, `messages.events.onFinish`) form independent sequences and execute in their own context — they are not continuations of the parent sequence. */
  commands: SvamlCommand[];
}
