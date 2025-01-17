import { UseCase } from "../UseCase";

export type DeleteServiceOrderByIdInputDto = {
    id: string;
};

export type DeleteServiceOrderByIdOutputDto = {
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

export interface DeleteServiceOrderById
    extends UseCase<
        DeleteServiceOrderByIdInputDto,
        DeleteServiceOrderByIdOutputDto | Error
    > {}
