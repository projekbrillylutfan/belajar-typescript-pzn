var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toContactRespnose } from "../model/contact-model.js";
import Validation from "../validation/validation.js";
import { ContactValidation } from "../validation/contact-validation.js";
import { prismaClient } from "../application/database.js";
import ResponseError from "../error/response-error.js";
export class ContactService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = Validation.validate(ContactValidation.CREATE, request);
            const record = Object.assign(Object.assign({}, createRequest), { username: user.username });
            const contact = yield prismaClient.contact.create({
                data: record
            });
            return toContactRespnose(contact);
        });
    }
    static checkContactMustExists(username, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield prismaClient.contact.findFirst({
                where: {
                    id: contactId,
                    username: username
                }
            });
            if (!contact) {
                throw new ResponseError(404, "Contact not found");
            }
            return contact;
        });
    }
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield this.checkContactMustExists(user.username, id);
            return toContactRespnose(contact);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = Validation.validate(ContactValidation.UPDATE, request);
            yield this.checkContactMustExists(user.username, updateRequest.id);
            const contact = yield prismaClient.contact.update({
                where: {
                    id: updateRequest.id,
                    username: user.username
                },
                data: updateRequest
            });
            return toContactRespnose(contact);
        });
    }
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkContactMustExists(user.username, id);
            const contact = yield prismaClient.contact.delete({
                where: {
                    id: id,
                    username: user.username
                }
            });
            return toContactRespnose(contact);
        });
    }
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = Validation.validate(ContactValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            // check if name exists
            if (searchRequest.name) {
                filters.push({
                    OR: [
                        {
                            first_name: {
                                contains: searchRequest.name
                            }
                        },
                        {
                            last_name: {
                                contains: searchRequest.name
                            }
                        }
                    ]
                });
            }
            // check if email exists
            if (searchRequest.email) {
                filters.push({
                    email: {
                        contains: searchRequest.email
                    }
                });
            }
            // check if phone exists
            if (searchRequest.phone) {
                filters.push({
                    phone: {
                        contains: searchRequest.phone
                    }
                });
            }
            const contacts = yield prismaClient.contact.findMany({
                where: {
                    username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield prismaClient.contact.count({
                where: {
                    username: user.username,
                    AND: filters
                },
            });
            return {
                data: contacts.map(contact => toContactRespnose(contact)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
}
