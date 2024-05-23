var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prismaClient } from "../application/database.js";
import { toAddressResponse } from "../model/address-model.js";
import { AddressValidation } from "../validation/address-validation.js";
import Validation from "../validation/validation.js";
import { ContactService } from "./contact-service.js";
import ResponseError from "../error/response-error.js";
export class AddressService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = Validation.validate(AddressValidation.CREATE, request);
            yield ContactService.checkContactMustExists(user.username, request.contact_id);
            const address = yield prismaClient.address.create({
                data: createRequest
            });
            return toAddressResponse(address);
        });
    }
    static checkAddressMustExists(contactId, addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield prismaClient.address.findFirst({
                where: {
                    id: addressId,
                    contact_id: contactId
                }
            });
            if (!address) {
                throw new ResponseError(404, "Address is not found");
            }
            return address;
        });
    }
    static get(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRequest = Validation.validate(AddressValidation.GET, request);
            yield ContactService.checkContactMustExists(user.username, request.contact_id);
            const address = yield this.checkAddressMustExists(getRequest.contact_id, getRequest.id);
            return toAddressResponse(address);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = Validation.validate(AddressValidation.UPDATE, request);
            yield ContactService.checkContactMustExists(user.username, request.contact_id);
            yield this.checkAddressMustExists(updateRequest.contact_id, updateRequest.id);
            const address = yield prismaClient.address.update({
                where: {
                    id: updateRequest.id,
                    contact_id: updateRequest.contact_id
                },
                data: updateRequest
            });
            return toAddressResponse(address);
        });
    }
    static remove(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const removeRequest = Validation.validate(AddressValidation.GET, request);
            yield ContactService.checkContactMustExists(user.username, request.contact_id);
            yield this.checkAddressMustExists(removeRequest.contact_id, removeRequest.id);
            const address = yield prismaClient.address.delete({
                where: {
                    id: removeRequest.id
                }
            });
            return toAddressResponse(address);
        });
    }
    static list(user, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ContactService.checkContactMustExists(user.username, contactId);
            const addresses = yield prismaClient.address.findMany({
                where: {
                    contact_id: contactId
                }
            });
            return addresses.map((address) => toAddressResponse(address));
        });
    }
}
