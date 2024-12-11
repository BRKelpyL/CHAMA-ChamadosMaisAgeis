import { HttpController } from "./Controller";

export type LoadUsersHttpInputDto = void;

export type LoadUserHttpOutputDto = {
    users: {
        id: string;
        name: string;
        email: string;
        password: string;
        isAdmin: boolean;
        whatsapp?: string;
    }[];
};

export interface LoadUsersHttp
    extends HttpController<
        LoadUsersHttpInputDto,
        LoadUserHttpOutputDto | Error
    > {}
