import { HttpMiddleware } from "./Middleware";

export type AuthUserMiddlewareInputDto = Record<string, any>;

export type AuthUserMiddlewareOutputDto = Record<string, any> & {
    authenticatedUserId: string;
    authenticatedUserRole: string;
};

export interface AuthUserMiddleware
    extends HttpMiddleware<
        AuthUserMiddlewareInputDto,
        AuthUserMiddlewareOutputDto | Error
    > {}
