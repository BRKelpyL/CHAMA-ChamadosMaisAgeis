import { UseCase } from "../UseCase";

export type LoadServiceOrderByIdInputDto = {
    id: string;
};

export type LoadServiceOrderByIdOutputDto = {
    id: string;
    title: string;
    description: string;
    toSectorId: string;
    status: string;
    createdAt: Date;
    attributedAt?: Date;
    closedAt?: Date;
    deleted: boolean;
};

export interface LoadServiceOrderById
    extends UseCase<
        LoadServiceOrderByIdInputDto,
        LoadServiceOrderByIdOutputDto | Error
    > {}
