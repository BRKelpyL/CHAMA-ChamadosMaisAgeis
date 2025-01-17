import { AuthUser } from "../../../application/contracts";
import {
    AuthUserMiddleware,
    AuthUserMiddlewareInputDto,
    AuthUserMiddlewareOutputDto,
    HttpResponse,
} from "..";
import { badRequest, serverError, success, unknownError } from "..";

export class AuthUserHttpMiddleware implements AuthUserMiddleware {
    constructor(private authUser: AuthUser) {}

    public async handle(
        request: AuthUserMiddlewareInputDto
    ): Promise<HttpResponse<AuthUserMiddlewareOutputDto | Error>> {
        try {
            const authenticatedUser = await this.authUser.execute(request);

            if (authenticatedUser instanceof Error) {
                return badRequest(authenticatedUser);
            }

            return success<AuthUserMiddlewareOutputDto>(authenticatedUser);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }
}
