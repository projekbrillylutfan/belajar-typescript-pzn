describe("generic func", () => {

   const create = <T>(value: T): T => {
       return value
   }
    it("should can", () => {
        const result = create<string>("eko")
        expect(result).toBe("eko")

        const result2 = create<number>(100)
        expect(result2).toBe(100)
    })
})