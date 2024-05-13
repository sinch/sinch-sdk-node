import { SearchPatternEnum } from '../enums';

export interface SearchPattern {
  /** Sequence of digits to search for. */
  pattern?: string;
  /** The pattern to apply to searches. */
  searchPattern?: SearchPatternEnum;
}
