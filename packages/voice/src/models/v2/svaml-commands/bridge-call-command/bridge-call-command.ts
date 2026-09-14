/**
 * Adds the current call to a bridge, enabling bidirectional audio communication with other calls in the same session. This is a non-blocking command — execution continues to the next command in the sequence immediately after the call joins the bridge.  Bridges are created automatically when referenced by name. If a bridge with the specified name already exists, the call joins that bridge; otherwise, a new bridge is created.
 */
export interface BridgeCallCommand {
  /** Command to add the call to a bridge */
  command: 'bridgeCall';
  /** Name of the bridge to join. If no bridge with this name exists in the session, a new one is created automatically. */
  bridgeName: string;
}
/** Validation regex for bridgeName */
export const bridgeNamePattern = /^\S+$/;
