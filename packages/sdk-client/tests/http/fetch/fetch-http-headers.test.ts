import { Headers } from 'node-fetch';
import { fromFetchHeaders, toFetchHeaders } from '../../../src/http/fetch';

describe('fetch HttpHeaders adapters', () => {

  it('round-trips node-fetch Headers including multi-value entries', () => {
    const fetchHeaders = new Headers();
    fetchHeaders.append('X-Multi', 'a');
    fetchHeaders.append('X-Multi', 'b');
    fetchHeaders.set('Authorization', 'Bearer token');

    const headers = fromFetchHeaders(fetchHeaders);
    const roundTripped = toFetchHeaders(headers);

    expect(headers.getAll('x-multi')).toEqual(['a', 'b']);
    expect(roundTripped.get('Authorization')).toBe('Bearer token');
    expect(fromFetchHeaders(roundTripped).getAll('x-multi')).toEqual(['a', 'b']);
  });

});
