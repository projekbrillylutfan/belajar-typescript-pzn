describe("static class", () => {
    class Configuration {
        static NAME: string = "Eko";
        static VERSION: number = 1.0;
        static AUThOR: string = "eko";
    }

    class MathUtil {
        static sum(...values: number[]): number {
            let total = 0
            for (const value of values) {
                total += value
            }

            return total
        }
    }
    it("should create static property", () => {
        console.info(Configuration.NAME);
        console.info(Configuration.VERSION);
        console.info(Configuration.AUThOR);
    })

    it("should create static method", () => {
        console.info(MathUtil.sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
    })
})