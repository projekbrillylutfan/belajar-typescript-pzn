import { Category, Product } from "../src/8_type-alias";

describe("type alias", () => {
    it("should declare", () => {
        const category: Category = {
            id: "1",
            name: "Laptop",
        };

        const product: Product = {
            id: "1",
            name: "Laptop",
            price: 1000,
            category,
        }

        console.info(product);
        console.info(category);
    })
})
