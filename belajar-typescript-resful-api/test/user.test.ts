import supertest from "supertest"
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"
import UserTest from "./test-util"
import bcrypt from "bcrypt"

describe("POST /api/users", () => {

    afterEach(async () => {
        await UserTest.delete()
    })
    it("should reject register new user if username already exists", async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "",
                password: "",
                name: "" 
            })

        console.log(response)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it("should register new user", async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "test",
                name: "test" 
            })

        console.log(response)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.name).toBe("test")
    })
})

describe("POST /api/users/login", () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it("should login user", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "test"
            })
        console.log(response)
        expect(response.status).toBe(200)
        expect(response.body.data.token).toBeDefined()
    })

    it("should reject login user if username incorrect", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "salah",
                password: "test"
            })
        console.log(response)
        expect(response.status).toBe(401)
    })

    it("should reject login user if password incorrect", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "ayam"
            })
        console.log(response)
        expect(response.status).toBe(401)
    })
})

describe("GET /api/users/current", () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to get user', async () => {
        const response = await supertest(web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    });

    it('should reject get user if token is invalid', async () => {
        const response = await supertest(web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "salah");

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
})

describe("PATCH /api/users/current", () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be reject to update user if request is not valid', async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                name: "",
                password: ""
            })

        console.log(response)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('should be abel to update user', async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                name: "benar",
            })

        console.log(response)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("benar")
    })

    it('should be abel to update password', async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                password: "benar",
            })

        console.log(response)
        expect(response.status).toBe(200)

        const user = await UserTest.get();
        expect(await bcrypt.compare("benar", user.password)).toBe(true)
    })
})

describe("DELETE /api/users/current", () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to delete user', async () => {
        const response = await supertest(web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "test");
        
        console.log(response)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("ok")

        const user = await UserTest.get();
        expect(user.token).toBe(null)
    })

    it('should reject to logout if token is invalid', async () => {
        const response = await supertest(web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "salah");
        
        console.log(response)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })
})
