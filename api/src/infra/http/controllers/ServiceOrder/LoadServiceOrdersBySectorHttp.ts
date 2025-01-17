import { LoadServiceOrdersBySector } from "../../../../application/contracts";
import {
    LoadServiceOrdersBySectorHttp,
    LoadServiceOrdersBySectorHttpInputDto,
    LoadServiceOrdersBySectorHttpOutputDto,
    HttpResponse,
    MissingParamError,
} from "../..";
import { badRequest, serverError, success, unknownError } from "../../helpers";

export class LoadServiceOrdersBySectorHttpController
    implements LoadServiceOrdersBySectorHttp
{
    constructor(
        private readonly loadServiceOrdersBySector: LoadServiceOrdersBySector
    ) {}

    public async handle(
        request: LoadServiceOrdersBySectorHttpInputDto
    ): Promise<HttpResponse<LoadServiceOrdersBySectorHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const serviceOrders = await this.loadServiceOrdersBySector.execute(
                request
            );
            if (serviceOrders instanceof Error) {
                return badRequest(serviceOrders);
            }
            return success(serviceOrders);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);
            return serverError(error);
        }
    }

    private validateRequest(
        request: LoadServiceOrdersBySectorHttpInputDto
    ): MissingParamError | undefined {
        const requiredFields: ["sectorId"] = ["sectorId"];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
