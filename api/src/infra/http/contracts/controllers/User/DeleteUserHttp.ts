import { HttpController } from "../Controller";

export type DeleteUserHttpInputDto = {
    id: string;
};

export type DeleteUserHttpOutputDto = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp?: string;
};

export interface DeleteUserByIdHttp
    extends HttpController<
        DeleteUserHttpInputDto,
        DeleteUserHttpOutputDto | Error
    > {}
