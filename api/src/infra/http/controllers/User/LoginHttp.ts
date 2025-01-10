import { Login, LoginInputDto } from "../../../../application/contracts";
import {
    LoginHttp,
    LoginHttpInputDto,
    LoginHttpOutputDto,
    HttpResponse,
    badRequest,
    serverError,
    unknownError,
    success,
} from "../..";
import { MissingParamError } from "../../errors";

export class LoginHttpController implements LoginHttp {
    constructor(private readonly login: Login) {}

    public async handle(
        request: LoginHttpInputDto
    ): Promise<HttpResponse<LoginHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const accessToken = await this.login.execute(request);

            if (accessToken instanceof Error) {
                return badRequest(accessToken);
            }

            return success<LoginHttpOutputDto>(accessToken);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }

    private validateRequest(
        request: LoginInputDto
    ): MissingParamError | undefined {
        const requiredFields: ["email", "password"] = ["email", "password"];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
