import {Router} from "bun-serve-router";

const file = Bun.file(import.meta.dir + "/msb.json");
const msb_info = await file.json();

const router = new Router();

router.add("GET", "/api/spaceapi", (request, params) => {
    return Response.json(msb_info);
});

router.add("GET", "/api/msb/state", (request, params) => {
    return Response.json({ state: msb_info.state?.open ? "open" : "closed" });
});

router.add("GET", "/api/msb/state/close", (request, params) => {
    const apiKey = request.headers.get('msb-key'); // Schlüssel im Header erwarten
    if (apiKey !== process.env.API_KEY) { return Response.json({message: "Go away!"}, { status: 401, statusText: "SuperSmashingGreat!" })}

    msb_info.state = {
        open: false,
        lastchange: Date.now()
    }
    return Response.json(msb_info);
});

router.add("GET", "/api/msb/state/open", (request, params) => {
    const apiKey = request.headers.get('msb-key'); // Schlüssel im Header erwarten
    if (apiKey !== process.env.API_KEY) { return Response.json({message: "Go away!"}, { status: 401, statusText: "SuperSmashingGreat!" }

    msb_info.state = {
        open: true,
        lastchange: Date.now(),
        message: "nur für Mitglieder"
    }
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
