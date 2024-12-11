import { CreateUser } from "../../../application/contracts";
import {
    CreateUserHttp,
    CreateUserHttpInputDto,
    CreateUserHttpOutputDto,
    HttpResponse,
    created,
} from "../../http";
import { badRequest, serverError, unknownError } from "../helpers";
import { MissingParamError } from "../errors";

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
        const requiredFields: ["name", "email", "password"] = [
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
