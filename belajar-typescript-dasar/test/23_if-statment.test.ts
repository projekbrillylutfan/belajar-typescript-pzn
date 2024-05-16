describe("if stsatement", () => {
    it("should declare", () => {
      const examValue: number = 100;

      if (examValue > 90) {
        console.info("passed");
      } else if (examValue > 80) {
        console.info("passed");
      } else if (examValue > 70) {
        console.info("passed");
      } else {
        console.info("failed");
      }
    });
  });
  