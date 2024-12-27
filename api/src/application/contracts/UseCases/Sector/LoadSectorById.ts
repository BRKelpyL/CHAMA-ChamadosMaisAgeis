import { UseCase } from "../UseCase";

export type LoadSectorByIdInputDto = {
    id: string;
};

export type LoadSectorByIdOutputDto = {
    id: string;
    name: string;
    deleted: boolean;
};

export interface LoadSectorById
    extends UseCase<LoadSectorByIdInputDto, LoadSectorByIdOutputDto | Error> {}
