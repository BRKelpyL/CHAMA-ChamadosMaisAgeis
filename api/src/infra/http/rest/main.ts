import { startServer } from "./config";
import { ServerHttpRestExpressAdapter } from "./express";

const serverHttpRestExpressAdapter = new ServerHttpRestExpressAdapter();

startServer({
    serverHttpRest: serverHttpRestExpressAdapter,
    port: 4001,
}).catch(async (error) => {
    console.error(error);
    process.exit(1);
});
