import { BatchOptions } from '../batch-options';
import { SvamlCommand } from '../svaml-commands';

/**
 * Request payload to initiate a batch of outbound call sessions.
 * Each entry in `parameters` queues one call using that entry's placeholder values.
 */
export interface BatchRequest {
  /** An ordered list of SVAML v2 (Sinch Voice Application Markup Language) commands that describe a call flow. Commands are executed sequentially in the order they are defined.  **Blocking vs. non-blocking:** Some commands block execution until they complete (`pause`, `webhook`, `menu`, `gotoMenu`), while others return immediately and run in parallel (`dial`, `messages`, `amd`, `answer`, `hangup`, `startRecording`, `stopRecording`, `bridgeCall`, `stopMessages`). Each command\'s description specifies its behavior.  **Nesting scope:** Commands that appear inside event handlers (e.g., `dial.events.onAnswer`, `messages.events.onFinish`) form independent sequences and execute in their own context — they are not continuations of the parent sequence. */
  commands: SvamlCommand[];
  /** An array of parameter objects that define values for dynamic placeholders in commands. Each object represents a set of parameters for a single queued call.  Use these parameters to inject customer-defined values into your SVAML commands, enabling personalized call flows without modifying the base command structure. */
  parameters: { [key: string]: string }[];
  /** @see BatchOptions */
  batchOptions?: BatchOptions;
}
