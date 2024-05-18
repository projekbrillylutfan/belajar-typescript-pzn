describe("inheritance interface", () => {

    interface HasName {
        name: string
    }

    interface CanSayHello {
        sayHello(name: string): void;
    }
    it("should create inheritance interface", () => {
        class Person implements HasName, CanSayHello {

            name: string;

            constructor(name: string) {
                this.name = name
            }

            sayHello(name: string): void {
                console.info(`Hello ${name} from ${this.name}`)
            }
        }

        const Person1 = new Person("eko")

        Person1.sayHello("budi")
    })
})