import { Response } from 'node-fetch';
import { Readable } from 'stream';
import { HttpContentParser } from '../http-content-parser';

const DEFAULT_FALLBACK_ENCODING: BufferEncoding = 'utf-8';

const CHARSET_TO_ENCODING: Record<string, BufferEncoding> = {
  'utf-8': DEFAULT_FALLBACK_ENCODING,
  utf8: DEFAULT_FALLBACK_ENCODING,
  ascii: 'ascii',
  'us-ascii': 'ascii',
  latin1: 'latin1',
  'iso-8859-1': 'latin1',
  'iso8859-1': 'latin1',
};

/** @internal */
export class FetchHttpContentParser implements HttpContentParser {
  private buffered: Buffer | undefined;
  private consumedAsStream = false;

  constructor(private readonly response: Response) {}

  async asString(): Promise<string> {
    const bytes = await this.asBytes();
    return bytes.toString(encodingFromContentType(this.response.headers.get('content-type')));
  }

  async asBytes(): Promise<Buffer> {
    if (this.buffered) {
      return this.buffered;
    }
    if (this.consumedAsStream) {
      throw new Error('Response body already consumed as a stream');
    }
    this.buffered = await this.response.buffer();
    return this.buffered;
  }

  async asJson(): Promise<unknown> {
    const text = await this.asString();
    return text ? JSON.parse(text) : undefined;
  }

  asStream(): NodeJS.ReadableStream {
    if (this.buffered) {
      return Readable.from(this.buffered);
    }
    if (this.consumedAsStream) {
      throw new Error('Response body already consumed as a stream');
    }
    const stream = this.response.body as NodeJS.ReadableStream | null;
    if (!stream) {
      throw new Error('Response body stream is not available');
    }
    this.consumedAsStream = true;
    return stream;
  }
}

function encodingFromContentType(contentType: string | null | undefined): BufferEncoding {
  if (!contentType) {
    return DEFAULT_FALLBACK_ENCODING;
  }
  const match = /charset\s*=\s*["']?([^;"'\s]+)/i.exec(contentType);
  if (!match) {
    return DEFAULT_FALLBACK_ENCODING;
  }
  return CHARSET_TO_ENCODING[match[1].toLowerCase()] ?? DEFAULT_FALLBACK_ENCODING;
}
