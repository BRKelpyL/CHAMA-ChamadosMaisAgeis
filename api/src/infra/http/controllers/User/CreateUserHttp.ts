import { CreateUser } from "../../../../application/contracts";
import {
    CreateUserHttp,
    CreateUserHttpInputDto,
    CreateUserHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, unknownError, created } from "../..";
import { MissingParamError } from "../../errors";

export class CreateUserHttpController implements CreateUserHttp {
    constructor(private readonly createUser: CreateUser) {}

    public async handle(
        request: CreateUserHttpInputDto
    ): Promise<HttpResponse<CreateUserHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const createdUser = await this.createUser.execute(request);

            if (createdUser instanceof Error) {
                return badRequest(createdUser);
            }

            return created<CreateUserHttpOutputDto>(createdUser);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }

    private validateRequest(
        request: CreateUserHttpInputDto
    ): MissingParamError | undefined {
        const requiredFields: [
            "authenticatedUserId",
            "authenticatedUserRole",
            "name",
            "email",
            "password"
        ] = [
            "authenticatedUserId",
            "authenticatedUserRole",
            "name",
            "email",
            "password",
        ];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
