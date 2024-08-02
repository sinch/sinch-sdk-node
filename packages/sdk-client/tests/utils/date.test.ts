import {
  DateFormat,
  formatDate,
  formatCreateTimeFilter,
  formatCreateTimeRangeFilter,
} from '../../src';

it('should format a date with its required chrono unit', () => {
  const date = new Date('2024-05-01T13:20:50Z');
  let formattedDate = formatDate(date, 'year');
  expect(formattedDate).toBe('2024');

  formattedDate = formatDate(date, 'month');
  expect(formattedDate).toBe('2024-05');

  formattedDate = formatDate(date, 'day');
  expect(formattedDate).toBe('2024-05-01');

  formattedDate = formatDate(date, 'hour');
  expect(formattedDate).toBe('2024-05-01T13:00:00Z');

  formattedDate = formatDate(date, 'minute');
  expect(formattedDate).toBe('2024-05-01T13:20:00Z');

  formattedDate = formatDate(date, 'second');
  expect(formattedDate).toBe('2024-05-01T13:20:50Z');
});

it('should format a dateTime filter parameter', () => {
  const dateUndefined = undefined;
  let formattedDateFilter = formatCreateTimeFilter(dateUndefined);
  expect(formattedDateFilter).toBeUndefined();

  const dateString =  '2024-05-01';
  formattedDateFilter = formatCreateTimeFilter(dateString);
  expect(formattedDateFilter).toBe('2024-05-01');

  const dateWithSecondsString ='2024-05-01T13:00:00Z';
  formattedDateFilter = formatCreateTimeFilter(dateWithSecondsString);
  expect(formattedDateFilter).toBe('2024-05-01');

  const dateWithSeconds = new Date('2024-05-01T13:00:00Z');
  formattedDateFilter = formatCreateTimeFilter(dateWithSeconds);
  expect(formattedDateFilter).toBe('2024-05-01');
});

it('should format a datetime range filter parameter', () => {
  const dateTimeRangeUndefined = undefined;
  let formattedDateTimeRangeFilter = formatCreateTimeRangeFilter(dateTimeRangeUndefined);
  expect(formattedDateTimeRangeFilter).toBeUndefined();

  const dateTimeRangeString = '2024-05-01';
  formattedDateTimeRangeFilter = formatCreateTimeRangeFilter(dateTimeRangeString);
  expect(formattedDateTimeRangeFilter).toBe('2024-05-01');

  const dateTimeRangeNoUnit: DateFormat = {
    date: new Date('2024-05-01T13:15:30Z'),
  };
  formattedDateTimeRangeFilter = formatCreateTimeRangeFilter(dateTimeRangeNoUnit);
  expect(formattedDateTimeRangeFilter).toBe('2024-05-01T13:15:30Z');

  const dateTimeRangeWithYear: DateFormat = {
    date: new Date('2024-05-01T13:15:30Z'),
    unit: 'year',
  };
  formattedDateTimeRangeFilter = formatCreateTimeRangeFilter(dateTimeRangeWithYear);
  expect(formattedDateTimeRangeFilter).toBe('2024');

  const dateTimeRangeWithMonth: DateFormat = {
    date: new Date('2024-05-01T13:15:30Z'),
    unit: 'month',
  };
  formattedDateTimeRangeFilter = formatCreateTimeRangeFilter(dateTimeRangeWithMonth);
  expect(formattedDateTimeRangeFilter).toBe('2024-05');

  const dateTimeRangeWithDay: DateFormat = {
    date: new Date('2024-05-01T13:15:30Z'),
    unit: 'day',
  };
  formattedDateTimeRangeFilter = formatCreateTimeRangeFilter(dateTimeRangeWithDay);
  expect(formattedDateTimeRangeFilter).toBe('2024-05-01');

  const dateTimeRangeWithHours: DateFormat = {
    date: new Date('2024-05-01T13:15:30Z'),
    unit: 'hour',
  };
  formattedDateTimeRangeFilter = formatCreateTimeRangeFilter(dateTimeRangeWithHours);
  expect(formattedDateTimeRangeFilter).toBe('2024-05-01T13:00:00Z');

  const dateTimeRangeWithMinutes: DateFormat = {
    date: new Date('2024-05-01T13:15:30Z'),
    unit: 'minute',
  };
  formattedDateTimeRangeFilter = formatCreateTimeRangeFilter(dateTimeRangeWithMinutes);
  expect(formattedDateTimeRangeFilter).toBe('2024-05-01T13:15:00Z');

  const dateTimeRangeWithSeconds: DateFormat = {
    date: new Date('2024-05-01T13:15:30Z'),
    unit: 'second',
  };
  formattedDateTimeRangeFilter = formatCreateTimeRangeFilter(dateTimeRangeWithSeconds);
  expect(formattedDateTimeRangeFilter).toBe('2024-05-01T13:15:30Z');
});
