describe("function", () => {
  it("should for parameter", () => {
    const sayHello = (
      name: string,
      filter: (name: string) => string
    ): string => {
      return `Hello ${filter(name)}`;
    };

    const toUpper = (name: string): string => {
      return name.toUpperCase();
    };

    expect(sayHello("eko", toUpper)).toBe("Hello EKO");
  });

  it("should for annonymous func parameter", () => {
    const sayHello = (
      name: string,
      filter: (name: string) => string
    ): string => {
      return `Hello ${filter(name)}`;
    };

    expect(
      sayHello("eko", (name: string): string => {
        return name.toUpperCase();
      })
    ).toBe("Hello EKO");
  });
});
