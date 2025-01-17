import { LoadAllServiceOrders } from "../../../../application/contracts";
import {
    LoadAllServiceOrdersHttp,
    LoadAllServiceOrdersHttpInputDto,
    LoadAllServiceOrdersHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, success, unknownError } from "../../helpers";

export class LoadAllServiceOrdersHttpController
    implements LoadAllServiceOrdersHttp
{
    constructor(private readonly loadAllServiceOrders: LoadAllServiceOrders) {}

    public async handle(
        request: LoadAllServiceOrdersHttpInputDto
    ): Promise<HttpResponse<LoadAllServiceOrdersHttpOutputDto | Error>> {
        try {
            const serviceOrders = await this.loadAllServiceOrders.execute(
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
}
