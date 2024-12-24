import { CreateServiceOrder } from "../../../../application/contracts";
import {
    CreateServiceOrderHttp,
    CreateServiceOrderHttpInputDto,
    CreateServiceOrderHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, created, unknownError } from "../..";
import { MissingParamError } from "../../errors";

export class CreateServiceOrderHttpController
    implements CreateServiceOrderHttp
{
    constructor(private readonly createServiceOrder: CreateServiceOrder) {}

    public async handle(
        request: CreateServiceOrderHttpInputDto
    ): Promise<HttpResponse<CreateServiceOrderHttpOutputDto | Error>> {
        try {
            const errorInRequest = this.validateRequest(request);
            if (errorInRequest) {
                return badRequest(errorInRequest);
            }

            const createdServiceOrder = await this.createServiceOrder.execute(
                request
            );
            if (createdServiceOrder instanceof Error) {
                return badRequest(createdServiceOrder);
            }

            return created<CreateServiceOrderHttpOutputDto>(
                createdServiceOrder
            );
        } catch (error) {
            const isError = error instanceof Error;
            if (!isError) return unknownError(error);

            return serverError(error);
        }
    }

    private validateRequest(
        request: CreateServiceOrderHttpInputDto
    ): MissingParamError | undefined {
        const requiredFields: ["title", "description", "toSectorId"] = [
            "title",
            "description",
            "toSectorId",
        ];

        for (const field of requiredFields) {
            if (!request[field]) {
                return new MissingParamError(field);
            }
        }
    }
}
