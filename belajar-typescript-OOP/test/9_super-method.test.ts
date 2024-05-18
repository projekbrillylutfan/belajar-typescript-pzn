describe("super method", () => {
    it("should create super method", () => {
        class Employee {
            name: string;

            constructor(name: string) {
                this.name = name;
            }

            sayHello(name: string): void {
                console.info(`Hello ${name} from ${this.name}`);
            }
        }

        class Manager extends Employee {
            sayHello(name: string): void {
                super.sayHello(name);
                console.info(`hello iam your manager`);
            }
        }

        
    })
})