import { UserToServiceOrderRelation } from "@/src/domain/models";
import { HttpController } from "../Controller";

export type LoadAllServiceOrdersByUserRelationHttpInputDto = {
    authenticatedUserId: string;
    authenticatedUserRole: string;
    relation: UserToServiceOrderRelation;
};

export type LoadAllServiceOrdersByUserRelationHttpOutputDto = {
    serviceOrders: {
        id: string;
        title: string;
        description: string;
        toSectorId: string;
        status: string;
        createdAt: Date;
        attributedAt?: Date;
        closedAt?: Date;
    }[];
};

export interface LoadAllServiceOrdersByUserRelationHttp
    extends HttpController<
        LoadAllServiceOrdersByUserRelationHttpInputDto,
        LoadAllServiceOrdersByUserRelationHttpOutputDto | Error
    > {}
