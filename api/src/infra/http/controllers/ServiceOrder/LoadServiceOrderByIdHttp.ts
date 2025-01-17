import { LoadServiceOrderById } from "../../../../application/contracts";
import {
    LoadServiceOrderByIdHttp,
    LoadServiceOrderByIdHttpInputDto,
    LoadServiceOrderByIdHttpOutputDto,
    HttpResponse,
    MissingParamError,
} from "../..";
import { badRequest, serverError, success, unknownError } from "../../helpers";

export class LoadServiceOrderByIdHttpController
    implements LoadServiceOrderByIdHttp
{
    constructor(
        private readonly loadServiceOrderByIdUseCase: LoadServiceOrderById
    ) {}
    async handle(
        request: LoadServiceOrderByIdHttpInputDto
    ): Promise<HttpResponse<LoadServiceOrderByIdHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const serviceOrder = await this.loadServiceOrderByIdUseCase.execute(
                request
            );
            if (serviceOrder instanceof Error) {
                return badRequest(serviceOrder);
            }
            return success(serviceOrder);
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);
            return serverError(error);
        }
    }

    private validateRequest(
        request: LoadServiceOrderByIdHttpInputDto
    ): MissingParamError | undefined {
        const requiredFields: ["id"] = ["id"];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
