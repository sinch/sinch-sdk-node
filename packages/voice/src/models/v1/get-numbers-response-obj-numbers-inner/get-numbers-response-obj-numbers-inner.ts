/**
 * Model: GetNumbersResponseObjNumbersInner
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


export interface GetNumbersResponseObjNumbersInner {

  /** Numbers that you own in E.164 format. */
  number?: string;
  /** Indicates the application where the number(s) will be assigned. If no number is assigned the applicationkey will not be returned. */
  applicationkey?: string;
  /** indicates the DID capability that needs to be assigned to the chosen application. Valid values are \'voice\' and \'sms\'. Please note that the DID needs to support the selected capability. */
  capability?: CapabilityEnum;
}

export type CapabilityEnum = 'voice' | 'sms';

