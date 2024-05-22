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