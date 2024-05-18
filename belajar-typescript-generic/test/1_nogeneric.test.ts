describe("no generic", () => {

    class Data {
        value: any;
        constructor(value: any) {
            this.value = value
        }
    }
    it("should create no generic", () => {
        const data = new Data("eko")
        data.value= 100;

        console.info(data.value.toUpperCase())
    })
})