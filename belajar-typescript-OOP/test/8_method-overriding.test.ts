describe("method overriding", () => {
    it("should create method overriding", () => {
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
                console.info(`Hello ${name} from manager ${this.name}`);
            }
        }

        
    })
})