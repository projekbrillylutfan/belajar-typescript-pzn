import { User } from "@prisma/client";
import { ContactRespones, CreateContactRequest, toContactRespnose } from "../model/contact-model";
import Validation from "../validation/validation";
import { ContactValidation } from "../validation/contact-validation";
import { prismaClient } from "../application/database";
import ResponseError from "../error/response-error";

export class ContactService {
    static async create(user: User, request: CreateContactRequest): Promise<ContactRespones> {
        const createRequest = Validation.validate(ContactValidation.CREATE, request)

        const record = {
            ...createRequest,
            ...{username: user.username}
        }

        const contact = await prismaClient.contact.create({
            data: record
        })

        return toContactRespnose(contact)
    }
}