import { SvamlInstructionAnswer } from '../svaml-instruction-answer';
import { SvamlInstructionPlayFiles } from '../svaml-instruction-play-files';
import { SvamlInstructionSay } from '../svaml-instruction-say';
import { SvamlInstructionSendDtmf } from '../svaml-instruction-send-dtmf';
import { SvamlInstructionSetCookie } from '../svaml-instruction-set-cookie';
import { SvamlInstructionStartRecording } from '../svaml-instruction-start-recording';
import { SvamlInstructionStopRecording } from '../svaml-instruction-stop-recording';

/**
 * Instructions allow an application to play a message or file, start recording, and various other tasks. For more information about instructions, see the [SVAML](../../svaml/) documentation.
 */
export type SvamlInstruction = SvamlInstructionPlayFiles
  | SvamlInstructionSay
  | SvamlInstructionSendDtmf
  | SvamlInstructionSetCookie
  | SvamlInstructionAnswer
  | SvamlInstructionStartRecording
  | SvamlInstructionStopRecording;
