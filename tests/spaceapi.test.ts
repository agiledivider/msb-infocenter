import { describe, expect, test, beforeAll } from "bun:test";
import { MsbInfoRouter } from "../src/routers/msb-router.ts";

describe("Spaceapi test", () => {

    test("should set CORS headers", async () => {
        let request = new Request("https://somedomain.com/api/spaceapi")

        const response =  await new MsbInfoRouter().match(request)

        expect(response).toBeInstanceOf(Response)
        if (response) {
            expect(response.headers.get("access-control-allow-origin")).toBe("*")
            expect(response.headers.get("access-control-allow-methods")).toContain("GET")
        }
    })

    test("is initially closed", async () => {
        let request = new Request("https://somedomain.com/api/spaceapi")

        const response =  await new MsbInfoRouter().match(request)
        const json = await response?.json() || {}

        expect(json.state.open).toBeFalse()
        expect(json.state.message).toBeUndefined()
    })
})