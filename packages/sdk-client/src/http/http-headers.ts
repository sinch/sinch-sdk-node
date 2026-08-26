import { Headers } from 'node-fetch';

interface HeaderBucket {
  originalName: string;
  values: string[];
}

/**
 * Case-insensitive, multi-value HTTP headers with insertion order preserved.
 * @internal
 */
export class HttpHeaders {
  private readonly store = new Map<string, HeaderBucket>();

  constructor(init?: Record<string, string | string[]>) {
    if (!init) {
      return;
    }
    for (const [name, value] of Object.entries(init)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          this.append(name, item);
        }
      } else {
        this.append(name, value);
      }
    }
  }

  get(name: string): string | undefined {
    const bucket = this.store.get(name.toLowerCase());
    return bucket ? bucket.values.join(', ') : undefined;
  }

  getAll(name: string): string[] {
    const bucket = this.store.get(name.toLowerCase());
    return bucket ? bucket.values.slice() : [];
  }

  set(name: string, value: string): this {
    this.store.set(name.toLowerCase(), { originalName: name, values: [value] });
    return this;
  }

  append(name: string, value: string): this {
    const key = name.toLowerCase();
    const existing = this.store.get(key);
    if (existing) {
      existing.values.push(value);
    } else {
      this.store.set(key, { originalName: name, values: [value] });
    }
    return this;
  }

  has(name: string): boolean {
    return this.store.has(name.toLowerCase());
  }

  delete(name: string): boolean {
    return this.store.delete(name.toLowerCase());
  }

  *entries(): IterableIterator<[string, string]> {
    for (const bucket of this.store.values()) {
      for (const value of bucket.values) {
        yield [bucket.originalName, value];
      }
    }
  }

  toFetchHeaders(): Headers {
    const headers = new Headers();
    for (const [name, value] of this.entries()) {
      headers.append(name, value);
    }
    return headers;
  }

  static fromFetchHeaders(headers: Headers): HttpHeaders {
    const result = new HttpHeaders();
    const rawHeaders = getRawHeaderMap(headers);
    if (rawHeaders) {
      for (const [name, values] of Object.entries(rawHeaders)) {
        for (const value of values) {
          result.append(name, value);
        }
      }
      return result;
    }
    headers.forEach((value, name) => {
      result.append(name, value);
    });
    return result;
  }
}

const getRawHeaderMap = (
  headers: Headers,
): Record<string, string[]> | undefined => {
  const withRaw = headers as Headers & { raw?: () => Record<string, string[]> };
  if (typeof withRaw.raw !== 'function') {
    return undefined;
  }
  return withRaw.raw();
};
