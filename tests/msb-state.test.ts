import {describe, expect, test, setSystemTime, beforeAll} from "bun:test";
import { MsbInfoRouter } from "../src/routers/msb-router.ts";

describe("change opening state", () => {

    const openUrl = "https://x.x/api/msb/state/open"
    const closeUrl = "https://x.x/api/msb/state/close"
    const testcases = [
        openUrl,
        closeUrl
    ]
    test.each(testcases)("no apiKey will deny access for %p", async (url) => {
        let request = new Request(url)

        const response =  await new MsbInfoRouter().match(request)

        expect(response?.status).toBe(401)
    })

    test.each(testcases)("wrong apiKey will deny access for %p", async (url) => {
        let request = new Request(url, { headers : {"msb-key" : "abcdefg" }})

        const response =  await new MsbInfoRouter().match(request)

        expect(response?.status).toBe(401)
    })

    test.each(testcases)("correct apiKey will allow access for %p", async (url) => {
        process.env.API_KEY = "abcdefg";
        let request = new Request(url, { headers : {"msb-key" : "abcdefg" }})

        const response =  await new MsbInfoRouter().match(request)

        expect(response?.status).toBe(200)
    })

    test("opening the space will be shown", async () => {
        process.env.API_KEY = "abcdefg";
        let request = new Request(openUrl, { headers : {"msb-key" : "abcdefg" }})

        const response =  await new MsbInfoRouter().match(request)
        const responseJson = await response?.json()
        expect(responseJson.state.open).toBeTrue()
    })

    test("closing the space will be shown", async () => {
        process.env.API_KEY = "abcdefg";
        let request = new Request(closeUrl, { headers : {"msb-key" : "abcdefg" }})

        const response =  await new MsbInfoRouter().match(request)
        const responseJson = await response?.json()
        expect(responseJson.state.open).toBeFalse()
    })

})