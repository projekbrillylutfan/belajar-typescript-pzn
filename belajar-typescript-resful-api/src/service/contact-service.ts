import { Contact, User } from "@prisma/client";
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

    static async checkContactMustExists(username: string, contactId: number): Promise<Contact> {
        const contact = await prismaClient.contact.findFirst({
            where:{
                id: contactId,
                username: username
            }
        });

        if(!contact){
            throw new ResponseError(404, "Contact not found");
        }

        return contact;
    }

    static async get(user: User, id: number): Promise<ContactRespones> {
        const contact = await this.checkContactMustExists(user.username, id);
        return toContactRespnose(contact);
    }
}