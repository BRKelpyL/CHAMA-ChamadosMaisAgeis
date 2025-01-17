import { ServiceOrderStatus } from "../../../../domain/models";
import { UseCase } from "../UseCase";

export type LoadServiceOrdersBySectorInputDto = {
    sectorId: string;
};

export type LoadServiceOrdersBySectorOutputDto = {
    serviceOrders: {
        id: string;
        title: string;
        description: string;
        toSectorId: string;
        status: ServiceOrderStatus;
        createdAt: Date;
        attributedAt?: Date;
        closedAt?: Date;
    }[];
};

export interface LoadServiceOrdersBySector
    extends UseCase<
        LoadServiceOrdersBySectorInputDto,
        LoadServiceOrdersBySectorOutputDto | Error
    > {}
