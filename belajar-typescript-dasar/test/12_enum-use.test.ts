import { Customer, CustomerType } from "../src/11_tipe-enum";

describe("type enum", () => {
    it("should declare", () => {
      const customer: Customer = {
        id: 1,
        name: "eko",
        type: CustomerType.REGULAR,
      }

      console.info(customer);
    });
  });
  