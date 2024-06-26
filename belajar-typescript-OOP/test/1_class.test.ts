describe("Class", () => {

    class Customer {
        constructor() {
            console.log("hello ini constructor");
        }

    }
    class Order {

    }

    it("should create class", () => {
        const customer: Customer = new Customer();
        const order: Order = new Order();
    })

    it("should create constructor", () => {
        new Customer();
    })

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
})