import { HttpController } from "../Controller";

export type CreateUserHttpInputDto = {
    authenticatedUserId: string;
    authenticatedUserRole: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp?: string;
};

export type CreateUserHttpOutputDto = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp?: string;
    deleted: boolean;
};

export interface CreateUserHttp
    extends HttpController<
        CreateUserHttpInputDto,
        CreateUserHttpOutputDto | Error
    > {}
