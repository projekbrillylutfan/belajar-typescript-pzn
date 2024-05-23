import { z } from "zod";
class UserValidation {
}
UserValidation.REGISTER = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
});
UserValidation.LOGIN = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
});
UserValidation.UPDATE = z.object({
    password: z.string().min(1).max(100).optional(),
    name: z.string().min(1).max(100).optional(),
});
export default UserValidation;
