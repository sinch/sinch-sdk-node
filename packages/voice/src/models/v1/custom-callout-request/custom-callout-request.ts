/**
 * Model: CustomCalloutRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { Destination } from '../destination';

/**
 * The custom callout, the server initiates a call from the servers that can be controlled by specifying how the call should progress at each call event.
 */
export interface CustomCalloutRequest {

  /** The number that will be displayed as the incoming caller, to set your own CLI, you may use your verified number or your Dashboard virtual number, it must be in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format. */
  cli?: string;
  /** @see Destination */
  destination?: Destination;
  /** When the destination picks up, this DTMF tones will be played to the callee. Valid characters in the string are "0"-"9", "#", and "w". A "w" will render a 500 ms pause. For example, "ww1234#w#" will render a 1s pause, the DTMF tones "1", "2", "3", "4" and "#" followed by a 0.5s pause and finally the DTMF tone for "#". This can be used if the callout destination for instance require a conference PIN code or an extension to be entered. */
  dtmf?: string;
  /** Can be used to input custom data. */
  custom?: string;
  /** The maximum amount of time in seconds that the call will last. */
  maxDuration?: number;
  /** You can use inline SVAML to replace a callback URL when using custom callouts. Ensure that the JSON object is escaped correctly. If inline ICE SVAML is passed, exclude *cli* and *destination* properties from the *customCallout* request body.  Example: ```"{"action":{"name":"connectPstn","number":"46000000001","maxDuration":90}}"```  */
  ice?: string;
  /** You can use inline SVAML to replace a callback URL when using custom callouts. Ensure that the JSON object is escaped correctly.  Example: ```"{"action": {"name": "RunMenu","locale": "en-US","menus": [{"id": "main","mainPrompt": "#tts[ Welcome to the main menu. Press 1 for a callback or 2 for a cancel</speak>]","timeoutMills": 5000,"options": [ {"dtmf": "1","action": "return(callback)"}, {"dtmf": "2","action": "return(cancel)"}]}]}}"```  */
  ace?: string;
  /** <b>Note:</b> PIE callbacks are not available for DATA Calls; only PSTN and SIP calls.  You can use inline SVAML to replace a callback URL when using custom callouts. Ensure that the JSON object is escaped correctly. A PIE event will contain a value chosen from an IVR choice. Usually a PIE event wil contain a URL to a callback sever that will receive the choice and be able to parse it. This could result in further SVAML or some other application logic function.  Example: ```"https://your-application-server-host/application"```  */
  pie?: string;
}


