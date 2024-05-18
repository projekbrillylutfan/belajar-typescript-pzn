describe("class relation", () => {
    class Person {
        constructor(public name: string) {
            
        }
    }

    class Customer {
        constructor(public name: string) {
            
        }
    }

    it("should create class relation", () => {
        const person: Person = new Person("eko");
    })
})