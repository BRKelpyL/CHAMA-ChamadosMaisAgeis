import { HttpController } from "../Controller";

export type LoadAllUsersHttpInputDto = void;

export type LoadAllUsersHttpOutputDto = {
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

export interface LoadAllUsersHttp
    extends HttpController<
        LoadAllUsersHttpInputDto,
        LoadAllUsersHttpOutputDto | Error
    > {}
