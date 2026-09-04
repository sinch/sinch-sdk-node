import { MenuPrompt } from '../menu-prompt';
import { SvamlCommand } from '../svaml-commands';


/**
 * Defines a single menu step, including prompts, input handling rules, input-to-command matches, and failure handling.  Each collected input is matched against the values in the `matches` property. If no match succeeds, the `onFail` commands are executed.  If neither `matches` nor `onFail` is defined and the service call behavior is set to `WEBHOOK`, a webhook request is sent including the collected input.
 */
export interface MenuItem {
  /** Prompt played when this menu starts.  This prompt is also used as the repeat prompt when repeatPrompt is not defined for the menu. */
  prompt?: MenuPrompt;
  /** Prompt played when the menu is repeated.  Repeats occur when input times out or when the provided input does not match any menu match item. */
  repeatPrompt?: MenuPrompt;
  /** Maximum number of seconds to wait for user input before the input attempt times out. */
  inputTimeoutDurationSeconds?: number;
  /** Maximum number of times the menu is repeated.  A repeat occurs when input times out or when the provided input does not match any menu match item. */
  repeatCount?: number;
  /** Minimum number of input characters required before the menu evaluates the collected input. */
  minimumInputLength?: number;
  /** Maximum number of input characters that triggers the menu to evaluate the collected input. */
  maximumInputLength?: number;
  /** Character sequence that signals the end of input and triggers immediate evaluation.  Useful when variable-length input is allowed and shorter valid options should be submitted without waiting for timeout or maximum length.  The terminating sequence value is included in the evaluated input. */
  terminatingSequence?: string;
  /** Input methods accepted for this menu when collecting user input. */
  inputMethods?: InputMethodsEnum[];
  /** Items matched against the collected input. Maximum number of allowed match expressions is 50.  Defined as a dictionary where each property name is a literal or a regular expression string.  Values are evaluated in the order they are defined. */
  matches?: { [key: string]: SvamlCommand[] };
  /** SVAML commands executed when the menu fails to collect a matching input.  This handler runs after the repeat limit is reached without any input matching a menu match item. */
  onFail?: SvamlCommand[];
}
export type InputMethodsEnum = 'DTMF' | string;
/** Validation regex for terminatingSequence */
export const terminatingSequencePattern = /^[0-9*#]+$/;
