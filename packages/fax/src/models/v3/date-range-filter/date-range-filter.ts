import { DateFormat } from '@sinch/sdk-client';

/**
 * Filter calls based on `createTime`. If not value is submitted, the default value is the prior week.
 * - `from: '2024-02-15'` will return all faxes from February 2024, 15th
 * - `from: '2024-02-01T14:00:00Z'` will return all faxes after 14:00:00 on the first of February 2024.
 * - `from: '2024-02-01T14:00:00Z'` + `to: '2024-02-01T15:00:00Z'` will return all faxes between 14:00:00 and 15:00:00 (inclusive) on the first of February 2024.
 * - `from: '2024-02-01'` + `to: '2024-02-29'` will return all faxes for all of February 2024.
 *
 * Note: It is also possible to submit partial dates.
 * - `from: '2024-02'` will return all faxes for February 2024
 */
export interface DateRangeFilter {
  /** */
  from?: string | Date | DateFormat;
  /** */
  to?: string | Date | DateFormat;
}
