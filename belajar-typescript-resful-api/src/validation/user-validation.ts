import { ZodType, z } from "zod"

class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        name: z.string().min(1).max(100),
    })

    static readonly LOGIN: ZodType = z.object({
        username: z.string().min(1, "Username cannot be empty").max(100, "Username cannot be longer than 100 characters"),
        password: z.string().min(1, "Password cannot be empty").max(100, "Password cannot be longer than 100 characters"),
    })

    static readonly UPDATE: ZodType = z.object({
        password: z.string().min(1).max(100).optional(),
        name: z.string().min(1).max(100).optional(),
    })
}

export default UserValidation