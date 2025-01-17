import { UseCase } from "../UseCase";

export type LoadAllServiceOrdersInputDto = void;

export type LoadAllServiceOrdersOutputDto = {
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

export interface LoadAllServiceOrders
    extends UseCase<
        LoadAllServiceOrdersInputDto,
        LoadAllServiceOrdersOutputDto | Error
    > {}
