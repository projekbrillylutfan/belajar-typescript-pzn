describe("type option properti", () => {
  it("should declare", () => {
    const person: { id: string; name: string; hobbies?: string[] } = {
      id: "1",
      name: "eko",
    };

    console.info(person);

    person.id = "2";
    person.name = "budi";

    console.info(person);
  });
});
