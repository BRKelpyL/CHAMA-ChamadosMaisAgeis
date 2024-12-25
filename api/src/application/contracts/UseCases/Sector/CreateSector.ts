import { UseCase } from "../UseCase";

export type CreateSectorInputDto = {
    name: string;
};

export type CreateSectorOutputDto = {
    id: string;
    name: string;
    deleted: boolean;
};

export interface CreateSector
    extends UseCase<CreateSectorInputDto, CreateSectorOutputDto | Error> {}
