import { reviveDates } from '../../src/client/api-client-helpers';

describe('API client helpers', () => {

  it('should revive Dates', () =>  {
    const obj = {
      date1: '2024-01-31T12:00:00.000Z',
      nested: {
        date2: '2024-02-15T18:30:00.000Z',
      },
      array: [
        {
          date3: '2024-02-03T04:15:00.000Z',
        },
        {
          date3: '2024-02-04T20:22:00.123Z',
        },
      ],
      unsupportedDate: '-0000',
      otherProp: 'otherValueWithMoreThan10Characters',
      otherNumber: 0,
      otherDecimalString: '0.07',
      otherLongDecimalString: '1234567890',
      otherBoolean: true,
      otherUndefined: undefined,
      otherNull: null,
    };
    const expected = {
      date1: new Date('2024-01-31T12:00:00.000Z'),
      nested: {
        date2: new Date('2024-02-15T18:30:00.000Z'),
      },
      array: [
        {
          date3: new Date('2024-02-03T04:15:00.000Z'),
        },
        {
          date3: new Date('2024-02-04T20:22:00.123Z'),
        },
      ],
      unsupportedDate: '-0000',
      otherProp: 'otherValueWithMoreThan10Characters',
      otherNumber: 0,
      otherDecimalString: '0.07',
      otherLongDecimalString: '1234567890',
      otherBoolean: true,
      otherUndefined: undefined,
      otherNull: null,
    };
    expect(reviveDates(obj)).toStrictEqual(expected);
  });

  it('should revive RFC 2822 dates', () => {
    const date = 'Thu, 06 Jun 2024 07:40:00 +0000';
    expect(reviveDates(date)).toEqual(new Date('2024-06-06T07:40:00.000Z'));
  });

});
