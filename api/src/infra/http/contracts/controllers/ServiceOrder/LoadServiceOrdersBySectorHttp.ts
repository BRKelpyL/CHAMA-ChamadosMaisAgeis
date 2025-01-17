import { HttpController } from "../Controller";

export type LoadServiceOrdersBySectorHttpInputDto = {
    sectorId: string;
};

export type LoadServiceOrdersBySectorHttpOutputDto = {
    serviceOrders: {
        id: string;
        title: string;
        description: string;
        toSectorId: string;
        status: string;
        createdAt: Date;
        attributedAt?: Date;
        closedAt?: Date;
    }[];
};

export interface LoadServiceOrdersBySectorHttp
    extends HttpController<
        LoadServiceOrdersBySectorHttpInputDto,
        LoadServiceOrdersBySectorHttpOutputDto | Error
    > {}
