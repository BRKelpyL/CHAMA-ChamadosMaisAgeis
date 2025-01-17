import { HttpController } from "../Controller";

export type LoadServiceOrderByIdHttpInputDto = {
    id: string;
};

export type LoadServiceOrderByIdHttpOutputDto = {
    id: string;
    title: string;
    description: string;
    toSectorId: string;
    status: string;
    createdAt: Date;
    attributedAt?: Date;
    closedAt?: Date;
};

export interface LoadServiceOrderByIdHttp
    extends HttpController<
        LoadServiceOrderByIdHttpInputDto,
        LoadServiceOrderByIdHttpOutputDto | Error
    > {}
