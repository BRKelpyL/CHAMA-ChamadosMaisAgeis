import { UpdateSector } from "../../../../application/contracts";
import {
    UpdateSectorHttp,
    UpdateSectorHttpInputDto,
    UpdateSectorHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, success, unknownError } from "../..";
import { MissingParamError } from "../../errors";

export class UpdateSectorHttpController implements UpdateSectorHttp {
    constructor(private readonly updateSector: UpdateSector) {}

    public async handle(
        request: UpdateSectorHttpInputDto
    ): Promise<HttpResponse<UpdateSectorHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const updatedSector = await this.updateSector.execute(request);

            if (updatedSector instanceof Error) {
                return badRequest(updatedSector);
            }

            return success<UpdateSectorHttpOutputDto>(updatedSector);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }
    private validateRequest(
        request: UpdateSectorHttpInputDto
    ): MissingParamError | undefined {
        const requiredFields: ["id", "name"] = ["id", "name"];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
