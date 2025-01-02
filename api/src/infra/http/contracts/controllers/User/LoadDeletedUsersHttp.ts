import { HttpController } from "../Controller";

export type LoadDeletedUsersHttpInputDto = void;

export type LoadDeletedUsersHttpOutputDto = {
    users: {
        id: string;
        name: string;
        email: string;
        password: string;
        isAdmin: boolean;
        whatsapp?: string;
        deleted: boolean;
    }[];
};

export interface LoadDeletedUsersHttp
    extends HttpController<
        LoadDeletedUsersHttpInputDto,
        LoadDeletedUsersHttpOutputDto | Error
    > {}
