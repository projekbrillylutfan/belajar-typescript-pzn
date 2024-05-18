describe("handling error", () => {
  class ValidationError extends Error {
    constructor(public message: string) {
      super(message);
    }
  }

  it("should create handling error", () => {
    const doubleIt = (value: number): number => {
      if (value < 0) {
        throw new ValidationError("Value cannot be negative");
      }

      return value * 2;
    };

    try {
      const result = doubleIt(-1);
      console.info(result);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.info(error.message);
      }
    }
  });
});
