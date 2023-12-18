/**
 * Model: LinksObject
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * Available methods and actions which can be done after a successful Verification
 */
export interface LinksObject {

  /** The related action that can be performed on the initiated Verification. */
  rel?: string;
  /** The complete URL to perform the specified action, localized to the DataCenter which handled the original Verification request. */
  href?: string;
  /** The HTTP method to use when performing the action using the linked localized URL. */
  method?: string;
}


