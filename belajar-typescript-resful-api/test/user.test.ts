import supertest from "supertest"
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"
import UserTest from "./test-util"

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
