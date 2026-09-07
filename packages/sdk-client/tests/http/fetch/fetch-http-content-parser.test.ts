import { Response } from 'node-fetch';
import { FetchHttpContentParser } from '../../../src/http/fetch';
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

  it('serves a buffered body as a stream', async () => {
    const parser = new FetchHttpContentParser(new Response('hello', { status: 200 }));
    await parser.asString();

    const chunks: unknown[] = [];
    for await (const chunk of parser.asStream()) {
      chunks.push(chunk);
    }

    expect(chunks).toHaveLength(1);
    expect(Buffer.isBuffer(chunks[0])).toBe(true);
    expect(chunks[0]).toEqual(Buffer.from('hello'));
  });

  it('throws when buffered helpers are used after asStream', async () => {
    const parser = new FetchHttpContentParser(
      new Response(Readable.from(['chunk']), { status: 200 }),
    );
    const stream = parser.asStream();
    expect(stream).toBeDefined();

    await expect(parser.asString()).rejects.toThrow('Response body already consumed as a stream');
  });

  it('decodes asString using the content-type charset', async () => {
    const text = 'café';
    const parser = new FetchHttpContentParser(
      new Response(Buffer.from(text, 'latin1'), {
        status: 200,
        headers: { 'content-type': 'text/plain; charset=iso-8859-1' },
      }),
    );

    await expect(parser.asString()).resolves.toBe(text);
  });

  it('defaults asString to utf-8 when charset is missing or unknown', async () => {
    const text = 'café';
    const utf8Bytes = Buffer.from(text, 'utf-8');
    const parser = new FetchHttpContentParser(
      new Response(utf8Bytes, {
        status: 200,
        headers: { 'content-type': 'text/plain; charset=unknown-charset' },
      }),
    );

    await expect(parser.asString()).resolves.toBe(text);
  });

  it('does not treat a pdf body as json', async () => {
    const pdfBytes = Buffer.from('%PDF-1.4 binary \x00\xff content');
    const parser = new FetchHttpContentParser(
      new Response(pdfBytes, {
        status: 200,
        headers: { 'content-type': 'application/pdf' },
      }),
    );

    await expect(parser.asBytes()).resolves.toEqual(pdfBytes);
    await expect(parser.asJson()).rejects.toThrow(SyntaxError);
  });

  it('does not treat a multipart body as json', async () => {
    const multipart = Buffer.from(
      '--boundary\r\nContent-Disposition: form-data; name="f"\r\n\r\nhi\r\n--boundary--',
    );
    const parser = new FetchHttpContentParser(
      new Response(multipart, {
        status: 200,
        headers: { 'content-type': 'multipart/form-data; boundary=boundary' },
      }),
    );

    await expect(parser.asBytes()).resolves.toEqual(multipart);
    await expect(parser.asJson()).rejects.toThrow(SyntaxError);
  });

});
