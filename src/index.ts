import { MsbInfoRouter } from "./routers/msb-router.ts";
const router = new MsbInfoRouter();


const server = Bun.serve({
    port: 80,
    fetch: async function (request) {
        // Match here
        const response = await router.match(request);
        if (response) {
            return response;
        }

        // Return 404 if no route matches
        return new Response("404 Not Found", {status: 404});
    },
});

console.log(`Listening on ${server.url}`);
