import { HttpController } from "../Controller";

export type LoadUserByIdHttpInputDto = {
    id: string;
};

export type LoadUserByIdHttpOutputDto = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp?: string;
};

export interface LoadUserByIdHttp
    extends HttpController<
        LoadUserByIdHttpInputDto,
        LoadUserByIdHttpOutputDto | Error
    > {}
