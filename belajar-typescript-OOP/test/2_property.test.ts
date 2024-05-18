describe("Property", () => {
    it("should create property", () => {
        class Customer {
            readonly id: number;
            name: string;
            age?: number;
            constructor(id: number, name: string) {
                this.id = id;
                this.name = name;
                
            }
    
        }

        const customer = new Customer(1, "eko");

        customer.age = 30;
        console.info(customer);
    })

    it("should create property default value", () => {
        class Customer {
            readonly id: number;
            name: string = "";
            age?: number;
            constructor(id: number) {
                this.id = id;
                
            }
    
        }

        const customer = new Customer(1);

        customer.age = 30;
        console.info(customer);
    })
})