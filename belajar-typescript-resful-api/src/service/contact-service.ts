import { Contact, User } from "@prisma/client";
import { ContactRespones, CreateContactRequest, UpdateContactRequest, toContactRespnose } from "../model/contact-model";
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

    static async update(user: User, request: UpdateContactRequest) : Promise<ContactRespones> {
        const updateRequest = Validation.validate(ContactValidation.UPDATE, request);
        await this.checkContactMustExists(user.username, updateRequest.id);

        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username
            },
            data: updateRequest
        });

        return toContactRespnose(contact);
    }

    static async remove(user: User, id: number) : Promise<ContactRespones> {
        await this.checkContactMustExists(user.username, id);

        const contact = await prismaClient.contact.delete({
            where: {
                id: id,
                username: user.username
            }
        });

        return toContactRespnose(contact);
    }
}