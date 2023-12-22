/**
 * Model: GetConferenceInfoResponseParticipantsInner
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


export interface GetConferenceInfoResponseParticipantsInner {

  /** The phone number of the PSTN participant that was connected in the conference, or whatever was passed as CLI for data originated/terminated calls. */
  cli?: string;
  /** The callId of the call leg that the participant joined the conference. */
  id?: string;
  /** The number of seconds that the participant has been connected to the conference. */
  duration?: number;
  muted?: boolean;
  onhold?: boolean;
}


