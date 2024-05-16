describe("tipe union", () => {
  it("should declare", () => {
    let sample: number | string | boolean = "eko";
    sample = 1;
    sample = true;

    console.info(sample);
  });

  it("should support union type checking", () => {
    const proses = (value: number | string | boolean) => {
      if (typeof value === "string") {
        return value.toUpperCase();
      } else if (typeof value === "number") {
        return value + 2;
      } else {
        return !value;
      }
    };

    const ayam = (value: any | any | any): any => {
      return value
    };

    expect(ayam(100)).toBe(100);

    expect(proses(100)).toBe(102);
    expect(proses("eko")).toBe("EKO");
    expect(proses(false)).toBe(true);
  });
});
