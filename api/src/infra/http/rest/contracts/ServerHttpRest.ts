import { HttpController, HttpMiddleware } from "../../contracts";

export type RestMethod = "get" | "post" | "put" | "delete";

export interface ServerHttpRest {
    on: (
        method: RestMethod,
        path: string,
        controller: HttpController,
        middlewares?: HttpMiddleware[]
    ) => void;
    listen: (port: number) => void;
}
