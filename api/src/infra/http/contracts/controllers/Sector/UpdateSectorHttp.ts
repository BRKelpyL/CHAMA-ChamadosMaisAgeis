import { HttpController } from "../Controller";

export type UpdateSectorHttpInputDto = {
    id: string;
    name: string;
};

export type UpdateSectorHttpOutputDto = {
    id: string;
    name: string;
    deleted: boolean;
};

export interface UpdateSectorHttp
    extends HttpController<
        UpdateSectorHttpInputDto,
        UpdateSectorHttpOutputDto | Error
    > {}
