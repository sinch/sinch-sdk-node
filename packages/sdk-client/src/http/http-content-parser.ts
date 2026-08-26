import { Response } from 'node-fetch';

/**
 * Lazy parser over an HTTP response body.
 * Buffered helpers (`asString`, `asBytes`, `asJson`) share one in-memory copy.
 * `asStream` reads the underlying body and cannot be mixed with buffered helpers.
 * @internal
 */
export interface HttpContentParser {
  asString(): Promise<string>;
  asBytes(): Promise<Buffer>;
  asJson(): Promise<unknown>;
  asStream(): NodeJS.ReadableStream;
}

/** @internal */
export class FetchHttpContentParser implements HttpContentParser {
  private buffered: Buffer | undefined;
  private consumedAsStream = false;

  constructor(private readonly response: Response) {}

  async asString(): Promise<string> {
    const bytes = await this.asBytes();
    return bytes.toString('utf-8');
  }

  async asBytes(): Promise<Buffer> {
    if (this.consumedAsStream) {
      throw new Error('Response body already consumed as a stream');
    }
    if (!this.buffered) {
      this.buffered = await this.response.buffer();
    }
    return this.buffered;
  }

  async asJson(): Promise<unknown> {
    const text = await this.asString();
    return text ? JSON.parse(text) : undefined;
  }

  asStream(): NodeJS.ReadableStream {
    if (this.buffered) {
      throw new Error('Response body already consumed as buffered content');
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
