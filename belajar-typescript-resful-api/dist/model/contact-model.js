"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toContactRespnose = void 0;
function toContactRespnose(contact) {
    return {
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone
    };
}
exports.toContactRespnose = toContactRespnose;
