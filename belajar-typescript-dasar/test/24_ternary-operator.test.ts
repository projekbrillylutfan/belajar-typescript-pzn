describe("if ternary operator", () => {
  it("should declare", () => {
    const value: number = 100;
    const say = value > 90 ? "passed" : "failed";

    console.info(say);
  });
});
