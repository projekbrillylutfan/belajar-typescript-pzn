describe("abstract class", () => {

    abstract class Customer {
        readonly id: number;
        abstract name: string
        constructor(id: number) {
            this.id = id;
        }

        abstract sayHello(name: string): void;
    }

    class RegularCustomer extends Customer {
        name: string;

        constructor(id: number, name: string) {
            super(id);
            this.name = name;
        }

        sayHello(name: string): void {
            console.info(`Hello ${name} from ${this.name}`);
        }
    }

    it("should create abstract class", () => {
        
    })
})