describe("function parameter", () => {
    it("should func default value", () => {
        const sayHello = (name: string = "guest"): string => {
            return `Hello ${name}`
        }

        expect(sayHello("eko")).toBe("Hello eko")
        expect(sayHello()).toBe("Hello guest")

    })

    it("should func rest parameter", () => {
        const sum = (...values: number[]): number => {
            let total = 0
            for (const value of values) {
                total += value
            }

            return total
        }

        expect(sum(1, 2, 3, 4, 5)).toBe(15)
    })

    it("should func optional parameter", () => {
        const sayHello = (firstName: string, lastName?: string): string => {
            if(lastName) {
                return `Hello ${firstName} ${lastName}`
            } else {
                return `Hello ${firstName}`
            }
        }

        expect(sayHello("eko")).toBe("Hello eko")
        expect(sayHello("eko", "kurniawan")).toBe("Hello eko kurniawan")
    })
})