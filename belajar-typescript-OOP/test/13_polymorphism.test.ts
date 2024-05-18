describe("Polymorphism", () => {

    class Employee {
        constructor(public name: string) {
            
        }
    }

    class Manger extends Employee{
    }

    class VicePresident extends Manger{

    }

    const sayHello = (employee: Employee): void => {
        console.info(`Hello ${employee.name}`);
    }

    it("should create polymorphism", () => {
        let employee: Employee = new Employee("eko");
        console.info(employee);

        employee = new Manger("budi");
        console.info(employee);

        employee = new VicePresident("loks");
        console.info(employee);
    })

    it("should create method polymorphism", () => {
        sayHello(new Employee("eko"));
        sayHello(new Manger("budi"));
        sayHello(new VicePresident("loks"));
    })
})