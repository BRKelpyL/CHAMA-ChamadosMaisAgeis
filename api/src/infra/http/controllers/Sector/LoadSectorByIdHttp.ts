import { LoadSectorById } from "../../../../application/contracts";
import {
    LoadSectorByIdHttp,
    LoadSectorByIdHttpInputDto,
    HttpResponse,
    MissingParamError,
    LoadSectorByIdHttpOutputDto,
} from "../..";
import { badRequest, serverError, sucess, unknownError } from "../../helpers";

export class LoadSectorByIdHttpController implements LoadSectorByIdHttp {
    constructor(private readonly loadSectorById: LoadSectorById) {}

    public async handle(
        request: LoadSectorByIdHttpInputDto
    ): Promise<HttpResponse<LoadSectorByIdHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const sector = await this.loadSectorById.execute(request);

            if (sector instanceof Error) {
                return badRequest(sector);
            }

            return sucess<LoadSectorByIdHttpOutputDto>(sector);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }

    private validateRequest(
        request: LoadSectorByIdHttpInputDto
    ): MissingParamError | undefined {
        const requiredFields: ["id"] = ["id"];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
