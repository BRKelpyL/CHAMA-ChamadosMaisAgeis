import { LoadUserById } from "../../../../application/contracts";
import {
    LoadUserByIdHttpInputDto,
    LoadUserByIdHttpOutputDto,
    LoadUserByIdHttp,
    HttpResponse,
    MissingParamError,
} from "../..";
import { badRequest, serverError, success, unknownError } from "../../helpers";

export class LoadUserByIdHttpController implements LoadUserByIdHttp {
    constructor(private readonly loadUserById: LoadUserById) {}

    public async handle(
        request: LoadUserByIdHttpInputDto
    ): Promise<HttpResponse<LoadUserByIdHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const user = await this.loadUserById.execute(request);

            if (user instanceof Error) {
                return badRequest(user);
            }

            return success<LoadUserByIdHttpOutputDto>(user);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }

    private validateRequest(
        request: LoadUserByIdHttpInputDto
    ): MissingParamError | undefined {
        const requiredFields: ["id"] = ["id"];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
