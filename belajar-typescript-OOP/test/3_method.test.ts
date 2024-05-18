describe("Method", () => {
    it("should create method", () => {
        class Customer {
            readonly id: number;
            name: string;
            age?: number;
            constructor(id: number, name: string) {
                this.id = id;
                this.name = name;
                
            }

            sayHello(name: string): void {
                console.info(`Hello ${name} from ${this.name}`);
            }
    
        }

        const customer = new Customer(1, "eko");

        customer.age = 30;
        customer.sayHello("budi");
        console.info(customer);
    })
})