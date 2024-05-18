describe("generic class", () => {

    class GenericData<T> {
        value: T

        constructor(value: T) {
            this.value = value
        }
    }
    it("should can only accept one type", () => {
        const data = new GenericData<string>("eko")
        // data.value= 100;
        // data.value = true
    })

    it("should can only accept one type 2", () => {
        const data = new GenericData<number>(123)
        expect(data.value).toBe(123)

        const dataString = new GenericData<string>("eko")
        const firstName = dataString.value.substring(0, 3)

        expect(firstName).toBe("eko")
    })
})