import {Router} from "bun-serve-router";

const file = Bun.file(import.meta.dir + "/msb.json");
const msb_info = await file.json();

const router = new Router();

router.add("GET", "/api/spaceapi", (request, params) => {
    return Response.json(msb_info);
});

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
