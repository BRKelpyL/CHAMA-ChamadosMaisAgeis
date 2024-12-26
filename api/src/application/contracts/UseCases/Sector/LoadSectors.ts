import { UseCase } from "../UseCase";

export type LoadSectorsInputDto = void;

export type LoadSectorsOutputDto = {
    sectors: {
        id: string;
        name: string;
        deleted: boolean;
    }[];
};

export interface LoadSectors
    extends UseCase<LoadSectorsInputDto, LoadSectorsOutputDto | Error> {}
