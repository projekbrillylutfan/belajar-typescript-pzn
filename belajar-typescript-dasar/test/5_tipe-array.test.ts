describe("tipe array", () => {
  it("should declare", () => {
    const name: string[] = ["eko", "budi"];
    const values: number[] = [1, 2, 3];

    console.info(name);
    console.info(values);
  });

  it("should support readonly array", () => {
    const hobbies: ReadonlyArray<string> = ["membaca", "menulis"];
    console.info(hobbies);
  });

  it("should support tuple array", () => {
    const person: readonly [string, string, number] = ["eko", "budi", 30];
    console.log(person);
  });
});
