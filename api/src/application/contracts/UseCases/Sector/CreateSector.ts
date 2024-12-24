import { UseCase } from "../UseCase";

export type CreateSectorInputDto = {
    name: string;
};

export type CreateSectorOutputDto = {
    id: string;
    name: string;
};

export interface CreateSector
    extends UseCase<CreateSectorInputDto, CreateSectorOutputDto | Error> {}
