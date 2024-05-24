"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class UserValidation {
}
UserValidation.REGISTER = zod_1.z.object({
    username: zod_1.z.string().min(1).max(100),
    password: zod_1.z.string().min(1).max(100),
    name: zod_1.z.string().min(1).max(100),
});
UserValidation.LOGIN = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username cannot be empty").max(100, "Username cannot be longer than 100 characters"),
    password: zod_1.z.string().min(1, "Password cannot be empty").max(100, "Password cannot be longer than 100 characters"),
});
UserValidation.UPDATE = zod_1.z.object({
    password: zod_1.z.string().min(1).max(100).optional(),
    name: zod_1.z.string().min(1).max(100).optional(),
});
exports.default = UserValidation;
