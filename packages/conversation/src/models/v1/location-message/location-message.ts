import { Coordinates } from '../coordinates';

/**
 * Message containing geographic location.
 */
export interface LocationMessage {
  /** Message containing geographic location. */
  location_message: LocationMessageItem;
}
export interface LocationMessageItem {
  /** @see Coordinates */
  coordinates: Coordinates;
  /** Label or name for the position. */
  label?: string;
  /** The title is shown close to the button or link that leads to a map showing the location. The title can be clickable in some cases. */
  title: string;
}
