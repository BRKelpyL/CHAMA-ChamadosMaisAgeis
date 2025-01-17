import { AddUserToSector } from "../../../../application/contracts";
import {
    AddUserToSectorHttp,
    AddUserToSectorHttpInputDto,
    AddUserToSectorHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, success, unknownError } from "../..";
import { MissingParamError } from "../../errors";

export class AddUserToSectorHttpController implements AddUserToSectorHttp {
    constructor(private readonly addUserToSector: AddUserToSector) {}

    public async handle(
        request: AddUserToSectorHttpInputDto
    ): Promise<HttpResponse<AddUserToSectorHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const addedUserToSector = await this.addUserToSector.execute(
                request
            );

            if (addedUserToSector instanceof Error) {
                return badRequest(addedUserToSector);
            }

            return success<AddUserToSectorHttpOutputDto>(addedUserToSector);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }

    private validateRequest(
        request: AddUserToSectorHttpInputDto
    ): MissingParamError | undefined {
        const requiredFields: ["userId", "sectorId"] = ["userId", "sectorId"];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
