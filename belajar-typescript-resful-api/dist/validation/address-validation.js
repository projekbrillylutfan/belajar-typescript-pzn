import { z } from "zod";
export class AddressValidation {
}
AddressValidation.CREATE = z.object({
    contact_id: z.number().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(10),
});
AddressValidation.GET = z.object({
    contact_id: z.number().positive(),
    id: z.number().positive(),
});
AddressValidation.REMOVE = z.object({
    contact_id: z.number().positive(),
    id: z.number().positive(),
});
AddressValidation.UPDATE = z.object({
    id: z.number().positive(),
    contact_id: z.number().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(10),
});
