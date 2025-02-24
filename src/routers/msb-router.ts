import {Router} from "bun-serve-router";

const file = Bun.file(import.meta.dir + "/../msb.json");
const msb_info = await file.json();


class MsbInfoRouter extends Router {
    constructor() {
        super()
        this.add("GET", "/api/spaceapi", (request, params) => {
            const r = Response.json(msb_info)
            r.headers.set('Access-Control-Allow-Origin', '*');
            r.headers.set('Access-Control-Allow-Methods', 'GET');
            r.headers.set("Access-Control-Allow-Headers", "Content-Type");
            return r;
        });

        this.add("GET", "/api/msb/state", (request, params) => {
            return Response.json({ state: msb_info.state?.open ? "open" : "closed" });
        });

this.add("GET", "/api/msb/state/close", (request, params) => {
    const apiKey = request.headers.get('msb-key'); // Schlüssel im Header erwarten
    return changeState(apiKey, false)
});

this.add("GET", "/api/msb/state/open", (request, params) => {
    const apiKey = request.headers.get('msb-key'); // Schlüssel im Header erwarten
    return changeState(apiKey, true);
});

    }
}


function changeState(apiKey: string | null, requestOpen = false) {
    let originalApikey = process.env.API_KEY || "testTheKey";

    if (apiKey !== originalApikey) {
        return Response.json({message: "Go away!"}, {status: 401, statusText: "SuperSmashingGreat!"})
    }
    if (msb_info.state.open !== requestOpen) {
        msb_info.state = {
            open: requestOpen,
            lastchange: Math.floor((new Date().valueOf())/1000),
            message: requestOpen ? "nur für Mitglieder" : undefined
        }
    }
    return Response.json(msb_info);
}

export { MsbInfoRouter }