import { HttpController } from "../Controller";

export type DeleteSectorHttpInputDto = {
    id: string;
};

export type DeleteSectorHttpOutputDto = {
    id: string;
    name: string;
};

export interface DeleteSectorHttp
    extends HttpController<
        DeleteSectorHttpInputDto,
        DeleteSectorHttpOutputDto | Error
    > {}
