import { UseCase } from "../UseCase";

export type DeleteSectorInputDto = {
    id: string;
};

export type DeleteSectorOutputDto = {
    id: string;
    name: string;
};

export interface DeleteSector
    extends UseCase<DeleteSectorInputDto, DeleteSectorOutputDto | Error> {}
