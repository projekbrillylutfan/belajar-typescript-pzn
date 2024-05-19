import { ZodError, z } from "zod";

describe("zod", () => {
  it("should create schema", () => {
    const schema = z.string().min(3).max(100);

    const request = "eko";

    const result = schema.parse(request);
    expect(result).toBe(request);
  });

  it("should support validate primitive data types", () => {
    const usernameSchema = z.string().email();
    const isAdminSchema = z.boolean();
    const priceSchema = z.number().min(1000).max(1000000);

    const username = usernameSchema.parse("a@a.com");
    console.info(username);

    const isAdmin = isAdminSchema.parse(true);
    console.info(isAdmin);

    const price = priceSchema.parse(100000);
    console.info(price);
  });

  it("should support data conversion", () => {
    const usernameSchema = z.coerce.string().min(3).max(20);
    const isAdminSchema = z.coerce.boolean();
    const priceSchema = z.coerce.number().min(1000).max(1000000);

    const username = usernameSchema.parse(123);
    console.info(username);

    const isAdmin = isAdminSchema.parse("true");
    console.info(isAdmin);

    const price = priceSchema.parse("100000");
    console.info(price);
  });

  it("should support date validation", () => {
    const birthDateSchema = z.coerce
      .date()
      .min(new Date(1900, 0, 1))
      .max(new Date(2020, 0, 1));

    const birthDate = birthDateSchema.parse("1990-01-01");
    console.info(birthDate);

    const birthDate2 = birthDateSchema.parse(new Date(1990, 0, 1));
    console.info(birthDate2);
  });

  it("should return zod error if invalid", () => {
    const schema = z.string().email().min(3).max(100);

    try {
      schema.parse("ek");
    } catch (e) {
      if (e instanceof ZodError) {
        e.errors.forEach((error) => {
          console.info(error.message);
        });
      }
    }
  });

  it("should return zod error if invalid without exception", () => {
    const schema = z.string().email().min(3).max(100);

    const result = schema.safeParse("ek@a.com");

    if (result.success) {
      console.info(result.data);
    } else {
      console.error(result.error);
    }
  });

  it("should can validate object", () => {
    const loginSchema = z.object({
      username: z.string().email(),
      password: z.string().min(6).max(100),
    });

    const request = {
      username: "a@a.com",
      password: "123456",
      ignore: "ignore",
    };

    const result = loginSchema.parse(request);
    console.info(result);
  });

  it("should can nested object", () => {
    const createUserSchema = z.object({
      id: z.string().max(100),
      name: z.string().min(3).max(100),
      address: z.object({
        street: z.string().max(100),
        city: z.string().max(100),
        zip: z.string().max(10),
        country: z.string().max(100),
      }),
    });

    const request = {
      id: "123",
      name: "Eko",
      address: {
        street: "jalan raya",
        city: "jakarta",
        zip: "12345",
        country: "indonesia",
      },
    };

    const result = createUserSchema.parse(request);
    console.info(result);
  });

  it("should can validate array", () => {
    const schema = z.array(z.string()).min(1).max(10);

    const request: Array<string> = ["a", "b", "c"];
    const result: Array<string> = schema.parse(request);

    console.log(result);
  });

  it("should can validate set", () => {
    const schema = z.set(z.string()).min(1).max(10);

    const request: Set<string> = new Set(["a", "b", "c"]);
    const result: Set<string> = schema.parse(request);

    console.log(result);
  })

  it("should can validate map", () => {
    const schema = z.map(z.string(), z.string());

    const request: Map<string, string> = new Map([
      ["a", "b"],
      ["c", "d"],
    ]);
    const result: Map<string, string> = schema.parse(request);

    console.log(result);
  })

  it('should can validate object with message', () => {
    const loginSchema = z.object({
        username: z.string().email("usernmae harus email"),
        password: z.string().min(6, "password minimal 6 karakter").max(20, "password maksimal 20 karakter")
    })

    const request = {
        username: "a@",
        password: "12",
        ignore: "ignore",
    }

    try {
        loginSchema.parse(request)
    } catch(e) {
        if (e instanceof ZodError) {
            console.info(e.errors)
            e.errors.forEach((error) => {
                console.info(error.message)
            })
        }
    }
  })

  it("should can support optional validation", () => {
    const registerSchema = z.object({
        username: z.string().email(),
        password: z.string().min(6).max(20),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100).optional(),   
    })

    const request = {
        username: "a@a.com",
        password: "123456",
        firstName: "Eko",
        lastName: "Kurniawan",
        ignore: "ignore",
    }

    const result = registerSchema.parse(request);
    console.info(result);
  })

  it("should can support transform validation", () => {
    const schema = z.string().email().transform((value) => {
        return value.toUpperCase();
    })

    const result = schema.parse("eko@gmail.com");
    console.log(result);
  })

  it("should can create custom validation", () => {
    const loginSchema = z.object({
        username: z.string().email().transform((data, ctx) => {
            if (data !== data.toUpperCase()) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "username harus uppercase",
                })
                return z.NEVER
            } else {
                return data
            }
        }),
        password: z.string().min(6, "password minimal 6 karakter").max(20, "password maksimal 20 karakter")
    })

    const request = {
        username: "eko@gmail.com",
        password: "123456",
        ignore: "ignore",
    }

    try {
        loginSchema.parse(request)
    } catch(e) {
        if (e instanceof ZodError) {
            console.info(e.errors)
            e.errors.forEach((error) => {
                console.info(error.message)
            })
        }
    }
  })
});
