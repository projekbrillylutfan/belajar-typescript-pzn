describe("function overloading", () => {
  it("should func", () => {
    function callMe(value: number): number;
    function callMe(value: string): string;

    function callMe(value: any) {
      if (typeof value === "string") {
        return value;
      } else if (typeof value === "number") {
        return value;
      }
    }

    expect(callMe("eko")).toBe("eko");
    expect(callMe(100)).toBe(100);
  });
});
