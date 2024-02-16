/**
 *
 */
export interface ManageConferenceParticipantRequest {

  /** Action to apply on conference participant. */
  command: 'mute' | 'unmute' | 'onhold' | 'resume';
  /** Means "music on hold". If this optional parameter is included, plays music to the first participant in a conference while they're alone and waiting for other participants to join. If `moh` isn't specified, the user will only hear silence while alone in the conference. This property is only available to use with the `onhold` command. */
  moh?: 'ring' | 'music1' | 'music2' | 'music3';
}
