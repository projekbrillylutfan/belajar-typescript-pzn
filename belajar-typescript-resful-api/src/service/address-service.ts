import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { CreateAddressRequest, AddressResponse, toAddressResponse } from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import Validation from "../validation/validation";
import { ContactService } from "./contact-service";

export class AddressService {
    static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
        const createRequest = Validation.validate(AddressValidation.CREATE, request);
        await ContactService.checkContactMustExists(user.username, request.contact_id);

        const address = await prismaClient.address.create({
            data: createRequest
        });

        return toAddressResponse(address);
    }
}