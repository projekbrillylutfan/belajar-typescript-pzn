describe("type undefined and null", () => {
  it("should declare with undefined", () => {
    const sayHello = (name?: string) => {
      if (name) {
        console.log(`Hello ${name}`);
      } else {
        console.log(`Hello`);
      }
    };

    sayHello("Eko");
    const name: string | undefined = undefined;
    sayHello(name);
  });

  it("should declare with null", () => {
    const sayHello = (name?: string | null) => {
      if (name) {
        console.log(`Hello ${name}`);
      } else {
        console.log(`Hello`);
      }
    };

    sayHello("Eko");
    const name: string | undefined = undefined;
    sayHello(name);
    sayHello(null);
  });
});
