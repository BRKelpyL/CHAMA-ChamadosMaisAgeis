import { CreateSector } from "../../../../application/contracts";
import {
    CreateSectorHttp,
    CreateSectorHttpInputDto,
    CreateSectorHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, created, unknownError } from "../../helpers";
import { MissingParamError } from "../../errors";

export class CreateSectorHttpController implements CreateSectorHttp {
    constructor(private readonly createSector: CreateSector) {}

    public async handle(
        request: CreateSectorHttpInputDto
    ): Promise<HttpResponse<CreateSectorHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const createdSector = await this.createSector.execute(request);

            if (createdSector instanceof Error) {
                return badRequest(createdSector);
            }

            return created<CreateSectorHttpOutputDto>(createdSector);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }

    private validateRequest(
        request: CreateSectorHttpInputDto
    ): MissingParamError | undefined {
        const requiredFields: ["name"] = ["name"];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
