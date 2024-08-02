export interface DateFormat {
  date: Date;
  unit?: ChronoUnit;
}

export type ChronoUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

export const formatDate = (date: Date, unit?: ChronoUnit): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  switch (unit) {
  case 'year':
    return `${year}`;
  case 'month':
    return `${year}-${month}`;
  case 'day':
    return `${year}-${month}-${day}`;
  case 'hour':
    return `${year}-${month}-${day}T${hours}:00:00Z`;
  case 'minute':
    return `${year}-${month}-${day}T${hours}:${minutes}:00Z`;
  case 'second':
  default:
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }
};

export const formatCreateTimeFilter = (createTime: string | Date | undefined): string | undefined => {
  if (createTime !== undefined) {
    if (typeof createTime === 'string') {
      if (createTime.indexOf('T') > -1) {
        return createTime.substring(0, createTime.indexOf('T'));
      }
      return createTime;
    } else {
      return formatDate(createTime, 'day');
    }
  }
  return undefined;
};

export const formatCreateTimeRangeFilter = (
  timeBoundary: string | Date | DateFormat | undefined
): string | undefined => {
  if (timeBoundary !== undefined) {
    if (typeof timeBoundary === 'string') {
      return timeBoundary;
    } else if (timeBoundary instanceof Date) {
      return formatDate(timeBoundary);
    } else {
      return formatDate(timeBoundary.date, timeBoundary.unit);
    }
  }
  return undefined;
};
