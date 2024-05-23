import { z } from "zod";
export class ContactValidation {
}
ContactValidation.CREATE = z.object({
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).email().optional(),
    phone: z.string().min(1).max(20).optional(),
});
ContactValidation.UPDATE = z.object({
    id: z.number().positive(),
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).email().optional(),
    phone: z.string().min(1).max(20).optional(),
});
ContactValidation.SEARCH = z.object({
    name: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),
    email: z.string().min(1).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive()
});
