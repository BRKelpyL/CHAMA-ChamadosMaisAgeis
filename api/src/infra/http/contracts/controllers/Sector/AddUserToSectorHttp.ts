import { HttpController } from "../Controller";

export type AddUserToSectorHttpInputDto = {
    userId: string;
    sectorId: string;
};

export type AddUserToSectorHttpOutputDto = {
    id: string;
    userId: string;
    sectorId: string;
    deleted: boolean;
};

export interface AddUserToSectorHttp
    extends HttpController<
        AddUserToSectorHttpInputDto,
        AddUserToSectorHttpOutputDto | Error
    > {}
