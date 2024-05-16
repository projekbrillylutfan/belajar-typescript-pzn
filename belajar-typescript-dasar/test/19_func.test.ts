describe("function", () => {
    it("should declare", () => {
        const sayHello = (name: string): string => {
            return `Hello ${name}`
        }

        expect(sayHello("eko")).toBe("Hello eko")

        const printHello = (name: string): void => {
            console.log(`Hello ${name}`)
        }

        printHello("eko")
    })
})