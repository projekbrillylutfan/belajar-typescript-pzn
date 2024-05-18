describe("promise generic", () => {
    const fetcData = (value: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                if (value === "eko") {
                    resolve("eko" + value);
                } else {
                    reject("not found");
                }
            }, 1000);
        })
    }
    it("should support promise", async () => {
       const result = await fetcData("eko");
       expect(result).toBe("ekoeko")

       try {
        await fetcData("budi");
       } catch (error) {
        expect(error).toBe("not found");
       }
    })
  });
  