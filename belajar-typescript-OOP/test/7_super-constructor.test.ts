describe("super constructor", () => {
    it("should create super constructor", () => {
        class Person {
            name: string;

            constructor(name: string) {
                this.name = name;
            }
        }

        class Employee extends Person {
            departement: string;
            constructor(name: string, departement: string) {
                super(name);
                this.departement = departement
            }
        }

        const employee = new Employee("eko", "IT");
        console.info(employee)
    })
})