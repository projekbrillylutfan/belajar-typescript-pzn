export namespace MathUtils {
    export const PI: number = 3.14;

    export const sum = (...values: number[]): number => {
        let total = 0
        for (const value of values) {
            total += value
        }
        return total
    }
}