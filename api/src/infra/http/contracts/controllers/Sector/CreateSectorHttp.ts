import { HttpController } from "../Controller";

export type CreateSectorHttpInputDto = {
    name: string;
};

export type CreateSectorHttpOutputDto = {
    id: string;
    name: string;
};

export interface CreateSectorHttp
    extends HttpController<
        CreateSectorHttpInputDto,
        CreateSectorHttpOutputDto | Error
    > {}
