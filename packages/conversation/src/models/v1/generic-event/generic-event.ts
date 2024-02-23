export interface GenericEvent {

  /** Event that contains only a flexible payload field. */
  generic_event?: GenericEventItem;
}

export interface GenericEventItem {
  /** Arbitrary data set to the event. A valid JSON object */
  payload: object;
}
