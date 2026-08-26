import { HttpHeaders } from '../../src/http';
import { Headers } from 'node-fetch';

describe('HttpHeaders', () => {

  it('looks up headers without regard to case', () => {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    expect(headers.get('content-type')).toBe('application/json');
    expect(headers.get('CONTENT-TYPE')).toBe('application/json');
    expect(headers.has('Content-Type')).toBe(true);
  });

  it('preserves insertion order and repeated values', () => {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('X-Custom', 'first');
    headers.append('X-Custom', 'second');
    headers.append('Authorization', 'Bearer token');

    expect(headers.getAll('x-custom')).toEqual(['first', 'second']);
    expect(headers.get('x-custom')).toBe('first, second');
    expect([...headers.entries()]).toEqual([
      ['Accept', 'application/json'],
      ['X-Custom', 'first'],
      ['X-Custom', 'second'],
      ['Authorization', 'Bearer token'],
    ]);
  });

  it('set replaces existing values for the same header', () => {
    const headers = new HttpHeaders({ Accept: 'text/plain' });
    headers.set('accept', 'application/json');

    expect(headers.getAll('Accept')).toEqual(['application/json']);
  });

  it('round-trips node-fetch Headers including multi-value entries', () => {
    const fetchHeaders = new Headers();
    fetchHeaders.append('X-Multi', 'a');
    fetchHeaders.append('X-Multi', 'b');
    fetchHeaders.set('Authorization', 'Bearer token');

    const headers = HttpHeaders.fromFetchHeaders(fetchHeaders);
    const roundTripped = headers.toFetchHeaders();

    expect(headers.getAll('x-multi')).toEqual(['a', 'b']);
    expect(roundTripped.get('Authorization')).toBe('Bearer token');
    expect(HttpHeaders.fromFetchHeaders(roundTripped).getAll('x-multi')).toEqual(['a', 'b']);
  });

});
