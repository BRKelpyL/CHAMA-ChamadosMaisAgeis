import { ServiceOrderStatus } from "../../../../domain/models";
import { UseCase } from "../UseCase";

export type UpdateServiceOrderInputDto = {
    id: string;
    title?: string;
    description?: string;
    toSectorId?: string;
    status?: ServiceOrderStatus;
    createdAt?: Date;
    attributedAt?: Date;
    closedAt?: Date;
};

export type UpdateServiceOrderOutputDto = {
    id: string;
    title: string;
    description: string;
    toSectorId: string;
    status: ServiceOrderStatus;
    createdAt: Date;
    attributedAt?: Date;
    closedAt?: Date;
};

export interface UpdateServiceOrder
    extends UseCase<
        UpdateServiceOrderInputDto,
        UpdateServiceOrderOutputDto | Error
    > {}
