import { UseCase } from "../UseCase";

export type UpdateSectorInputDto = {
    id: string;
    name: string;
};

export type UpdateSectorOutputDto = {
    id: string;
    name: string;
    deleted: boolean;
};

export interface UpdateSector
    extends UseCase<UpdateSectorInputDto, UpdateSectorOutputDto | Error> {}
