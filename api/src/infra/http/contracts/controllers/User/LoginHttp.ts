import { HttpController } from "../Controller";

export type LoginHttpInputDto = {
    email: string;
    password: string;
};

export type LoginHttpOutputDto = {
    token: string;
};

export interface LoginHttp
    extends HttpController<LoginHttpInputDto, LoginHttpOutputDto | Error> {}
