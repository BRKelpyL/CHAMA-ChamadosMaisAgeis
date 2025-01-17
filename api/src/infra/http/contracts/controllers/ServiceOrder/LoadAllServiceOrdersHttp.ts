import { HttpController } from "../Controller";

export type LoadAllServiceOrdersHttpInputDto = void;

export type LoadAllServiceOrdersHttpOutputDto = {
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

export interface LoadAllServiceOrdersHttp
    extends HttpController<
        LoadAllServiceOrdersHttpInputDto,
        LoadAllServiceOrdersHttpOutputDto | Error
    > {}
