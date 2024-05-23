"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validation {
    static validate(schema, data) {
        return schema.parse(data);
    }
}
exports.default = Validation;
