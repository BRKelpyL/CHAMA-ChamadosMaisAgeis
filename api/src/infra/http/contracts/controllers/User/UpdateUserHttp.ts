import { HttpController } from "../Controller";

export type UpdateUserHttpInputDto = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp: string;
    deleted: boolean;
};

export type UpdateUserHttpOutputDto = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp?: string;
};

export interface UpdateUserHttp
    extends HttpController<
        UpdateUserHttpInputDto,
        UpdateUserHttpOutputDto | Error
    > {}
