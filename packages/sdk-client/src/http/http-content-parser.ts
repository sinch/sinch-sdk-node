/**
 * Lazy parser over an HTTP response body.
 * Buffered helpers (`asString`, `asBytes`, `asJson`) share one in-memory copy.
 * `asStream` can replay a buffered body; mixing it with the underlying unread
 * stream is not allowed.
 * @internal
 */
export interface HttpContentParser {
  asString(): Promise<string>;
  asBytes(): Promise<Buffer>;
  asJson(): Promise<unknown>;
  asStream(): NodeJS.ReadableStream;
}
