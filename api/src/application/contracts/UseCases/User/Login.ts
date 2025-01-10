import { UseCase } from "../UseCase";

export type LoginInputDto = {
    email: string;
    password: string;
};

export type LoginOutputDto = { token: string };

export interface Login extends UseCase<LoginInputDto, LoginOutputDto | Error> {}
