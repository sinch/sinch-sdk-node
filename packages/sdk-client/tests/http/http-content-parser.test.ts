import { Response } from 'node-fetch';
import { FetchHttpContentParser } from '../../src/http';
import { Readable } from 'stream';

describe('FetchHttpContentParser', () => {

  it('parses string, bytes and json from a shared buffer', async () => {
    const payload = { recipient: { phoneNumber: '+15551234567' } };
    const parser = new FetchHttpContentParser(
      new Response(JSON.stringify(payload), { status: 200 }),
    );

    await expect(parser.asString()).resolves.toBe(JSON.stringify(payload));
    await expect(parser.asJson()).resolves.toEqual(payload);
    await expect(parser.asBytes()).resolves.toEqual(Buffer.from(JSON.stringify(payload)));
  });

  it('returns undefined from asJson for an empty body', async () => {
    const parser = new FetchHttpContentParser(new Response('', { status: 204 }));

    await expect(parser.asJson()).resolves.toBeUndefined();
  });

  it('throws when asStream is called after buffered consumption', async () => {
    const parser = new FetchHttpContentParser(new Response('hello', { status: 200 }));
    await parser.asString();

    expect(() => parser.asStream()).toThrow('Response body already consumed as buffered content');
  });

  it('throws when buffered helpers are used after asStream', async () => {
    const parser = new FetchHttpContentParser(
      new Response(Readable.from(['chunk']), { status: 200 }),
    );
    const stream = parser.asStream();
    expect(stream).toBeDefined();

    await expect(parser.asString()).rejects.toThrow('Response body already consumed as a stream');
  });

});
