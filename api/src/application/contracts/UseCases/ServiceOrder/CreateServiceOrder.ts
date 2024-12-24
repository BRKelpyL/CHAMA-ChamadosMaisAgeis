import { UseCase } from "../UseCase";

export type CreateServiceOrderInputDto = {
    title: string;
    description: string;
    toSectorId: string;
};

export type CreateServiceOrderOutputDto = {
    id: string;
    title: string;
    description: string;
    toSectorId: string;
    status: string;
    createdAt: Date;
    attributedAt?: Date;
    closedAt?: Date;
};

export interface CreateServiceOrder
    extends UseCase<
        CreateServiceOrderInputDto,
        CreateServiceOrderOutputDto | Error
    > {}
