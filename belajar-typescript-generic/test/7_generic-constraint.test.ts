describe("generic param default", () => {
  interface Employee {
    id: string;
    name: string;
  }

  interface Manager extends Employee {
    totalEmployee: number;
  }

  interface VP extends Manager {
    totalManager: Number;
  }

  class EmployeeData<T extends Employee> {
    constructor(public employee: T) {}
  }
  it("should can", () => {
    const data1 = new EmployeeData<Employee>({ id: "1", name: "eko" });
    const data2 = new EmployeeData<Manager>({
      id: "1",
      name: "eko",
      totalEmployee: 10,
    });

    // const data3 = new EmployeeData<string>("eko")
    // const data4 = new EmployeeData<number>(123)
  });
});
