import { HttpController } from "../Controller";

export type LoadSectorByIdHttpInputDto = {
    id: string;
};

export type LoadSectorByIdHttpOutputDto = {
    id: string;
    name: string;
    deleted: boolean;
};

export type LoadSectorByIdHttp = HttpController<
    LoadSectorByIdHttpInputDto,
    LoadSectorByIdHttpOutputDto | Error
>;
