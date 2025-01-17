import { LoadAllServiceOrdersByUserRelation } from "../../../../application/contracts";
import {
    LoadAllServiceOrdersByUserRelationHttp,
    LoadAllServiceOrdersByUserRelationHttpInputDto,
    LoadAllServiceOrdersByUserRelationHttpOutputDto,
    HttpResponse,
} from "../..";
import { badRequest, serverError, success, unknownError } from "../../helpers";

export class LoadAllServiceOrdersByUserRelationHttpController
    implements LoadAllServiceOrdersByUserRelationHttp
{
    constructor(
        private readonly loadAllServiceOrdersByUserRelation: LoadAllServiceOrdersByUserRelation
    ) {}

    public async handle(
        request: LoadAllServiceOrdersByUserRelationHttpInputDto
    ): Promise<
        HttpResponse<LoadAllServiceOrdersByUserRelationHttpOutputDto | Error>
    > {
        try {
            const serviceOrders =
                await this.loadAllServiceOrdersByUserRelation.execute(request);
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
