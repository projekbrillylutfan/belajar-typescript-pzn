describe("generic collection", () => {
  it("should support array", () => {
    const array = new Array<string>();
    array.push("eko");
    array.push("budi");

    expect(array[0]).toBe("eko");
    expect(array[1]).toBe("budi");
  });

  it("should support set", () => {
      const set = new Set<string>();
      set.add("eko");
      set.add("budi");
      set.add("joko");

      expect(set.has("eko")).toBe(true);
      expect(set.has("budi")).toBe(true);
      expect(set.size).toBe(3);
  })

  it("should support map", () => {
      const map = new Map<string, number>();
      map.set("eko", 1);
      map.set("budi", 2);

      expect(map.get("eko")).toBe(1);
      expect(map.get("budi")).toBe(2);
  })
});
