/**
 * Model: ManageConferenceParticipantRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 *
 */
export interface ManageConferenceParticipantRequest {

  /** Action to apply on conference participant. */
  command: CommandEnum;
  /** Means "music on hold". If this optional parameter is included, plays music to the first participant in a conference while they're alone and waiting for other participants to join. If `moh` isn't specified, the user will only hear silence while alone in the conference. This property is only available to use with the `onhold` command. */
  moh?: MohEnum;
}

export type CommandEnum = 'mute'
  | 'unmute'
  | 'onhold'
  | 'resume';

export type MohEnum = 'ring'
  | 'music1'
  | 'music2'
  | 'music3';
