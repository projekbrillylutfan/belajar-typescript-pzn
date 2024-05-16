describe("switch statment", () => {
  it("should declare", () => {
    const sayHello = (name: string): string => {
      switch (name) {
        case "Eko":
            return `Hello ${name}`;
        case "Budi":
            return `Hello ${name}`;
        default:
            return `Hello`;
      }
    };

    console.info(sayHello("Eko"));
    console.info(sayHello("Budi"));
    console.info(sayHello("Guest"));
  });
});
