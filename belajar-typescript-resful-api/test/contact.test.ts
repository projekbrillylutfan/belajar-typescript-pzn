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