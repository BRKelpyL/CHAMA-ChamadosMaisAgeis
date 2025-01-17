import { DeleteUserById } from "../../../../application/contracts";
import {
    DeleteUserByIdHttp,
    DeleteUserHttpInputDto,
    DeleteUserHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, success, unknownError } from "../../helpers";
import { MissingParamError } from "../../errors";

export class DeleteUserByIdHttpController implements DeleteUserByIdHttp {
    constructor(private readonly deleteUser: DeleteUserById) {}

    public async handle(
        request: DeleteUserHttpInputDto
    ): Promise<HttpResponse<DeleteUserHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const deletedUser = await this.deleteUser.execute(request);

            if (deletedUser instanceof Error) {
                return badRequest(deletedUser);
            }

            return success<DeleteUserHttpOutputDto>(deletedUser);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }
    private validateRequest(
        request: DeleteUserHttpInputDto
    ): MissingParamError | undefined {
        const requiredFields: ["id"] = ["id"];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
