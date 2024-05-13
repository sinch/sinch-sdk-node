/**
 * Search pattern to apply. Options include, `START`, `CONTAIN`, and `END`.
 */
export interface NumberPatternSearchPattern {
  /** The pattern to apply to searches. Options include, `START`, `CONTAIN`, and `END`. */
  NumberPatternSearchPattern?: NumberPatternSearchPatternEnum;
}

export enum NumberPatternSearchPatternEnum {
  START = 'START',
  CONTAINS = 'CONTAINS',
  END = 'END',
}
