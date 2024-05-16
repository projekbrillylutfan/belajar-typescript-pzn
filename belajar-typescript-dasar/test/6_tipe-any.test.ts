describe("tipe any", () => {
    it("should declare", () => {
      const person: any = {
        name: "eko",
        balance: 10000,
        isVip: true,
      }

      person.balance = "1000000";

      console.info(person);
    });
  });
  