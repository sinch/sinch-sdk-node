import { AmdCommand } from '../amd-command';
import { AnswerCommand } from '../answer-command';
import { BridgeCallCommand } from '../bridge-call-command';
import { DialCommand } from '../dial-command';
import { GotoMenuCommand } from '../goto-menu-command';
import { HangupCommand } from '../hangup-command';
import { MenuCommand } from '../menu-command';
import { MessagesCommand } from '../messages-command';
import { PauseCommand } from '../pause-command';
import { StartRecordingCommand } from '../start-recording-command';
import { StopMessagesCommand } from '../stop-messages-command';
import { StopRecordingCommand } from '../stop-recording-command';
import { WebhookCommand } from '../webhook-command';

/**
 * A single SVAML (Sinch Voice Application Markup Language) command that controls call behavior.  The `command` property acts as a discriminator and determines which command schema applies. When multiple commands appear in a `svamlCommands` array, they execute sequentially in order.  **Available commands:** - `dial` — Initiate an outbound call leg within the session. - `messages` — Play one or more TTS or audio messages on the call. - `stopMessages` — Stop a currently playing message sequence. - `webhook` — Trigger a mid-call webhook to the application backend for dynamic call control. - `amd` — Detect whether the call was answered by a human or an answering machine. - `hangup` — End the call or a specific call leg within the session. - `answer` — Explicitly answer an incoming call leg before executing further commands. - `pause` — Delay script execution without affecting call audio. - `startRecording` — Begin recording the call. - `stopRecording` — Stop an active call recording. - `bridgeCall` — Add the call to a named bridge for multi-party audio. - `menu` — Run menu-based input collection and route the call based on collected input. - `gotoMenu` — Switch execution to another named menu within the current menu context.
 */
export type SvamlCommand =
  | AmdCommand
  | DialCommand
  | MessagesCommand
  | StopMessagesCommand
  | WebhookCommand
  | HangupCommand
  | AnswerCommand
  | PauseCommand
  | StartRecordingCommand
  | StopRecordingCommand
  | BridgeCallCommand
  | MenuCommand
  | GotoMenuCommand;
