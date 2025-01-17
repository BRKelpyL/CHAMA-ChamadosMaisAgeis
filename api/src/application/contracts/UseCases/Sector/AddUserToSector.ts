import { UseCase } from "../UseCase";

export type AddUserToSectorInputDto = {
    userId: string;
    sectorId: string;
};

export type AddUserToSectorOutputDto = {
    id: string;
    userId: string;
    sectorId: string;
    deleted: boolean;
};

export interface AddUserToSector
    extends UseCase<
        AddUserToSectorInputDto,
        AddUserToSectorOutputDto | Error
    > {}
