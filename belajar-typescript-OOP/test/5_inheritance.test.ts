describe("inheritance", () => {
    it("should create inheritance", () => {
        class Employee {
            name: string;

            constructor(name: string) {
                this.name = name;
            }
        }

        class Manager extends Employee {

        }

        class Director extends Manager {
            
        }
    })
})