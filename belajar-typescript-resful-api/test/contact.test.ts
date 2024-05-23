import supertest from "supertest"
import UserTest, { ContactTest } from "./test-util"
import { web } from "../src/application/web"

describe("POST /api/contacts", () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it("should create contact", async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "eko",
                last_name: "kurniawan",
                email: "3Hg9h@example.com",
                phone: "081234567890"
            })

        console.log(response)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe("eko")
        expect(response.body.data.last_name).toBe("kurniawan")
        expect(response.body.data.email).toBe("3Hg9h@example.com")
        expect(response.body.data.phone).toBe("081234567890")
    })

    it('should reject create new contact if data is invalid', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name : "",
                last_name: "",
                email: "eko",
                phone: "08999990899999089999908999990899999"
            });

        console.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
})

describe('GET /api/contacts/:contactId', () => {

    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able get contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe(contact.first_name);
        expect(response.body.data.last_name).toBe(contact.last_name);
        expect(response.body.data.email).toBe(contact.email);
        expect(response.body.data.phone).toBe(contact.phone);
    });

    it('should reject get contact if contact is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test");

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

