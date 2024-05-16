import { sayHello } from "../src/1_say-hello";

describe("say hello", (): void => {
  it("should return hello eko", (): void => {
    expect(sayHello("eko")).toBe("Hello eko");
  });
});
