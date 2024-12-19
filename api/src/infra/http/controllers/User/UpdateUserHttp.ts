import { UpdateUser } from "../../../../application/contracts";
import {
    UpdateUserHttp,
    UpdateUserHttpInputDto,
    UpdateUserHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, sucess, unknownError } from "../../helpers";
import { MissingParamError } from "../../errors";

export class UpdateUserHttpController implements UpdateUserHttp {
    constructor(private readonly updateUser: UpdateUser) {}

    public async handle(
        request: UpdateUserHttpInputDto
    ): Promise<HttpResponse<UpdateUserHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const updatedUser = await this.updateUser.execute(request);

            if (updatedUser instanceof Error) {
                return badRequest(updatedUser);
            }

            return sucess<UpdateUserHttpOutputDto>(updatedUser);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }
    private validateRequest(
        request: UpdateUserHttpInputDto
    ): MissingParamError | undefined {
        const requiredFields: ["id"] = ["id"];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
