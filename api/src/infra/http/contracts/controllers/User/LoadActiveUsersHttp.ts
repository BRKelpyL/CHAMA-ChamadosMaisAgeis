import { HttpController } from "../Controller";

export type LoadActiveUsersHttpInputDto = void;

export type LoadActiveUserHttpOutputDto = {
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

export interface LoadActiveUsersHttp
    extends HttpController<
        LoadActiveUsersHttpInputDto,
        LoadActiveUserHttpOutputDto | Error
    > {}
