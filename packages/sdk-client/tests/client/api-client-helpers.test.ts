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
      otherProp: 'otherValue',
      otherNumber: 0,
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
      otherProp: 'otherValue',
      otherNumber: 0,
      otherBoolean: true,
      otherUndefined: undefined,
      otherNull: null,
    };
    expect(reviveDates(obj)).toStrictEqual(expected);
  });

});
