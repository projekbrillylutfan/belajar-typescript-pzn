import { Contact, User } from "@prisma/client";
import { ContactRespones, CreateContactRequest, SearchContactRequest, UpdateContactRequest, toContactRespnose } from "../model/contact-model";
import Validation from "../validation/validation";
import { ContactValidation } from "../validation/contact-validation";
import { prismaClient } from "../application/database";
import ResponseError from "../error/response-error";
import { Pageable } from "../model/page";

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

    static async search(user: User, request: SearchContactRequest) : Promise<Pageable<ContactRespones>> {
        const searchRequest = Validation.validate(ContactValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;

        const filters = [];
        // check if name exists
        if(searchRequest.name){
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
            })
        }
        // check if email exists
        if(searchRequest.email){
            filters.push({
                email: {
                    contains: searchRequest.email
                }
            })
        }
        // check if phone exists
        if(searchRequest.phone){
            filters.push({
                phone: {
                    contains: searchRequest.phone
                }
            })
        }

        const contacts = await prismaClient.contact.findMany({
            where: {
                username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });

        const total = await prismaClient.contact.count({
            where: {
                username: user.username,
                AND: filters
            },
        })

        return {
            data: contacts.map(contact => toContactRespnose(contact)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }
}