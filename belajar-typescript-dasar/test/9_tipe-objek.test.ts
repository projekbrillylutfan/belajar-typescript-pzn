describe("type objek", () => {
  it("should declare", () => {
    const person: { id: string; name: string } = {
      id: "1",
      name: "eko",
    }; 

    console.info(person);

    (person.id = "2"), (person.name = "budi");

    console.info(person);
  });
});
