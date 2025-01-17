import { UserToServiceOrderRelation } from "../../../../domain/models";
import { UseCase } from "../UseCase";

export type LoadAllServiceOrdersByUserRelationInputDto = {
    authenticatedUserId: string;
    authenticatedUserRole: string;
    relation: UserToServiceOrderRelation;
};

export type LoadAllServiceOrdersByUserRelationOutputDto = {
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

export interface LoadAllServiceOrdersByUserRelation
    extends UseCase<
        LoadAllServiceOrdersByUserRelationInputDto,
        LoadAllServiceOrdersByUserRelationOutputDto | Error
    > {}
