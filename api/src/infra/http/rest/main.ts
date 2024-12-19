import { env, startServer } from "./config";
import { ServerHttpRestExpressAdapter } from "./express";

const serverHttpRestExpressAdapter = new ServerHttpRestExpressAdapter();

startServer({
    serverHttpRest: serverHttpRestExpressAdapter,
    port: env.server.port,
}).catch(async (error) => {
    console.error(error);
    process.exit(1);
});
