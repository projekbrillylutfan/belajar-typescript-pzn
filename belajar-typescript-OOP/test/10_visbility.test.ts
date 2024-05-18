describe("visibility", () => {

    class Counter {
        // private counter: number = 0;
        protected counter: number = 0;

        public increment(): void {
            this.counter++;
        }

        public getCounter(): number {
            return this.counter;
        }
    }

    class DoubleCounter extends Counter {
        public increment(): void {
            this.counter+=2;
        }
    }

    it("should create private property", () => {
        const counter = new Counter();
        counter.increment();

        expect(counter.getCounter()).toBe(1);
    })
})