describe("visibility", () => {

    class Person {
        // private counter: number = 0;
        constructor(public name: string = "") {
            
        }
    }

    it("should create private property", () => {
        const person = new Person();
        person.name = "eko";
        console.info(person)
    })
})