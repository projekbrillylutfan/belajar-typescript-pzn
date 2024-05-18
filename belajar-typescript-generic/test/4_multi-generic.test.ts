describe("generic multi", () => {
  class Entry<T, U> {
    constructor(public key: T, public value: U) {}
  }

  class Triple<K, V, T> {
    constructor(public key: K, public value: V, public type: T) {}
  }
  it("should can", () => {
    const entry = new Entry<number, string>(1, "eko");
    expect(entry.key).toBe(1);
    expect(entry.value).toBe("eko");

    const triple = new Triple<number, string, boolean>(1, "eko", true);

    expect(triple.key).toBe(1);
    expect(triple.value).toBe("eko");
    expect(triple.type).toBe(true);
  });
});
