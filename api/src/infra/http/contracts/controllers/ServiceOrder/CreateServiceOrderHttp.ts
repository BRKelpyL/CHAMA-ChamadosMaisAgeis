import { HttpController } from "../Controller";

export type CreateServiceOrderHttpInputDto = {
    authenticatedUserId: string;
    authenticatedUserRole: string;
    title: string;
    description: string;
    toSectorId: string;
};

export type CreateServiceOrderHttpOutputDto = {
    id: string;
    title: string;
    description: string;
    toSectorId: string;
    status: string;
    createdAt: Date;
    attributedAt?: Date;
    closedAt?: Date;
};

export interface CreateServiceOrderHttp
    extends HttpController<
        CreateServiceOrderHttpInputDto,
        CreateServiceOrderHttpOutputDto | Error
    > {}
