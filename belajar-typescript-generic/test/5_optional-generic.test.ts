describe("optional generic", () => {
    class Entry<T, U> {
      constructor(public key: T, public value: U) {}
    }
  
    class Triple<K, V, T> {
      constructor(public key: K, public value: V, public type: T) {}
    }

    // generic class tanpa constructor
    class SimpleGeneric<T> {
        private value?: T

        setValue(value: T) {
            this.value = value
        }

        getValue(): T | undefined {
            return this.value
        }
    }
    it("should can", () => {
      const entry = new Entry(1, "eko");
      expect(entry.key).toBe(1);
      expect(entry.value).toBe("eko");
    });

    it("should can", () => {
        const simple = new SimpleGeneric<string>();
        simple.setValue("eko");
        expect(simple.getValue()!.toUpperCase()).toBe("EKO");
    })
  });
  