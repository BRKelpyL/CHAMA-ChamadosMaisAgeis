import { DeleteSector } from "../../../../application/contracts";
import {
    DeleteSectorHttp,
    DeleteSectorHttpInputDto,
    DeleteSectorHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, success, unknownError } from "../../helpers";
import { MissingParamError } from "../../errors";

export class DeleteSectorHttpController implements DeleteSectorHttp {
    constructor(private readonly deleteSector: DeleteSector) {}

    public async handle(
        request: DeleteSectorHttpInputDto
    ): Promise<HttpResponse<DeleteSectorHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const deletedSector = await this.deleteSector.execute(request);

            if (deletedSector instanceof Error) {
                return badRequest(deletedSector);
            }

            return success(deletedSector);
        } catch (error) {
            return unknownError(error);
        }
    }
    private validateRequest(
        request: DeleteSectorHttpInputDto
    ): MissingParamError | undefined {
        const requiredFields: ["id"] = ["id"];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
