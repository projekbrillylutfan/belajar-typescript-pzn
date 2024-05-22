import supertest from "supertest"
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"

describe("POST /api/users", () => {
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
})