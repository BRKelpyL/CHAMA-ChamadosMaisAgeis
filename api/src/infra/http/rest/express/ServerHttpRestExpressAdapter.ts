import express, { Application, json, Request, Response } from "express";
import cors from "cors";

import { RestMethod, ServerHttpRest } from "../contracts";
import { HttpController, HttpMiddleware } from "../../contracts";

export class ServerHttpRestExpressAdapter implements ServerHttpRest {
    public readonly express: Application;

    constructor() {
        this.express = express();
        this.express.use(json());
        this.express.use(cors({ origin: "*" }));
    }

    public on(
        method: RestMethod,
        path: string,
        controller: HttpController,
        middleware?: HttpMiddleware
    ): void {
        this.express[method](path, async (req: Request, res: Response) => {
            const { headers, body, query, params } = req;

            const request = {
                ...(headers ?? {}),
                ...(body ?? {}),
                ...(query ?? {}),
                ...(params ?? {}),
            };

            if (middleware) {
                const middlewareResponse = await middleware.handle(request);
                if (
                    !middlewareResponse ||
                    middlewareResponse.statusCode !== 200
                ) {
                    res.status(middlewareResponse.statusCode).json({
                        error: middlewareResponse.body.message,
                    });
                    return;
                }
                Object.assign(request, middlewareResponse.body);
            }

            const httpResponse = await controller.handle(request);
            if (
                httpResponse.statusCode >= 200 &&
                httpResponse.statusCode <= 299
            ) {
                res.status(httpResponse.statusCode).json(httpResponse.body);
            } else {
                res.status(httpResponse.statusCode).json({
                    error: httpResponse.body.message,
                });
            }
            return;
        });
    }

    public listen(port: number): void {
        this.express.listen({ port, host: "0.0.0.0" }, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}
