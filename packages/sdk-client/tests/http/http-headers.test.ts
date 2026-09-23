import { HttpHeaders } from '../../src/http';

describe('HttpHeaders', () => {

  it('looks up headers without regard to case', () => {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    expect(headers.getAll('content-type')).toEqual(['application/json']);
    expect(headers.getAll('CONTENT-TYPE')).toEqual(['application/json']);
    expect(headers.has('Content-Type')).toBe(true);
  });

  it('preserves first-seen header name order and repeated values', () => {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('X-Custom', 'first');
    headers.append('X-Custom', 'second');
    headers.append('Authorization', 'Bearer token');

    expect(headers.getAll('x-custom')).toEqual(['first', 'second']);
    expect([...headers.entries()]).toEqual([
      ['Accept', 'application/json'],
      ['X-Custom', 'first'],
      ['X-Custom', 'second'],
      ['Authorization', 'Bearer token'],
    ]);
  });

  it('set replaces existing values for the same header (case insensitive)', () => {
    const headers = new HttpHeaders({ Accept: 'text/plain' });
    headers.set('accept', 'application/json');

    expect(headers.getAll('Accept')).toEqual(['application/json']);
  });

  it('set preserves first-seen header name casing', () => {
    const headers = new HttpHeaders();
    headers.append('Accept', 'text/plain');
    headers.set('accept', 'application/json');

    expect([...headers.entries()]).toEqual([['Accept', 'application/json']]);
  });

  it('set and append accept multiple values', () => {
    const headers = new HttpHeaders();
    headers.set('Accept', ['application/json', 'text/plain']);

    expect(headers.getAll('accept')).toEqual(['application/json', 'text/plain']);

    headers.append('Accept', ['application/xml']);
    expect(headers.getAll('accept')).toEqual(['application/json', 'text/plain', 'application/xml']);
  });

  it('does not keep a reference to caller-provided value arrays', () => {
    const setValues = ['application/json'];
    const appendValues = ['text/plain'];
    const headers = new HttpHeaders();
    headers.set('Accept', setValues);
    headers.append('Accept', appendValues);
    setValues.push('mutated-set');
    appendValues.push('mutated-append');

    expect(headers.getAll('accept')).toEqual(['application/json', 'text/plain']);
  });

});
