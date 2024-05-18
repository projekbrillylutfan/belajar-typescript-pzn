describe("generic param default", () => {


    // generic class tanpa constructor
    class SimpleGeneric<T = string> {
        private value?: T

        setValue(value: T) {
            this.value = value
        }

        getValue(): T | undefined {
            return this.value
        }
    }

    it("should can", () => {
        const simple = new SimpleGeneric();
        simple.setValue("eko");
        expect(simple.getValue()!.toUpperCase()).toBe("EKO");
    })
  });
  