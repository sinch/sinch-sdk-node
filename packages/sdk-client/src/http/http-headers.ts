interface HeaderBucket {
  originalName: string;
  values: string[];
}

/**
 * Case-insensitive, multi-value HTTP headers.
 * Header names are stored in first-seen order; values for the same name are grouped together.
 * @internal
 */
export class HttpHeaders {
  private readonly store = new Map<string, HeaderBucket>();

  constructor(init?: Record<string, string | string[]>) {
    if (!init) {
      return;
    }
    for (const [name, value] of Object.entries(init)) {
      this.append(name, value);
    }
  }

  get(name: string): string | undefined {
    const bucket = this.store.get(this.headerKey(name));
    return bucket ? bucket.values.join(', ') : undefined;
  }

  getAll(name: string): string[] {
    const bucket = this.store.get(this.headerKey(name));
    return bucket ? bucket.values.slice() : [];
  }

  set(name: string, value: string | string[]): this {
    const values = Array.isArray(value) ? [...value] : [value];
    this.store.set(this.headerKey(name), { originalName: name, values });
    return this;
  }

  append(name: string, value: string | string[]): this {
    const values = Array.isArray(value) ? value : [value];
    const key = this.headerKey(name);
    const existing = this.store.get(key);
    if (existing) {
      existing.values.push(...values);
    } else {
      this.store.set(key, { originalName: name, values: [...values] });
    }
    return this;
  }

  has(name: string): boolean {
    return this.store.has(this.headerKey(name));
  }

  delete(name: string): boolean {
    return this.store.delete(this.headerKey(name));
  }

  *entries(): IterableIterator<[string, string]> {
    for (const bucket of this.store.values()) {
      for (const value of bucket.values) {
        yield [bucket.originalName, value];
      }
    }
  }

  private headerKey(name: string): string {
    return name.toLowerCase();
  }
}
