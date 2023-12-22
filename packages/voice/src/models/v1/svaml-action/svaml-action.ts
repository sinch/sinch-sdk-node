/**
 * Model: SvamlAction
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { SvamlActionConnectConf } from '../svaml-action-connect-conf';
import { SvamlActionConnectMxp } from '../svaml-action-connect-mxp';
import { SvamlActionConnectPstn } from '../svaml-action-connect-pstn';
import { SvamlActionConnectSip } from '../svaml-action-connect-sip';
import { SvamlActionContinue } from '../svaml-action-continue';
import { SvamlActionHangup } from '../svaml-action-hangup';
import { SvamlActionPark } from '../svaml-action-park';
import { SvamlActionRunMenu } from '../svaml-action-run-menu';

/**
 * The action that will control the call. Each SVAML object can only include one action.
 */
export type SvamlAction = SvamlActionHangup
  | SvamlActionContinue
  | SvamlActionConnectPstn
  | SvamlActionConnectMxp
  | SvamlActionConnectConf
  | SvamlActionConnectSip
  | SvamlActionRunMenu
  | SvamlActionPark;
