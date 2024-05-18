describe("operator instanceof", () => {

    class Employee {

    }

    class Manger {

    }



    it("should create typeof and hasil nya object", () => {
        const budi = new Employee();
        const eko = new Manger();

        console.info(typeof budi);
        console.info(typeof eko);
    })

    it("should use instanceof", () => {
        const budi = new Employee();
        const eko = new Manger();

        expect(budi instanceof Employee).toBe(true);
        expect(eko instanceof Manger).toBe(true);

        expect(budi instanceof Manger).toBe(false);
        expect(eko instanceof Employee).toBe(false);
    })
})