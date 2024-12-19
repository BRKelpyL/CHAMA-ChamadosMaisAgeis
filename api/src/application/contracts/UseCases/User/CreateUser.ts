import { UseCase } from "../UseCase";

export type CreateUserInputDto = {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp?: string;
};

export type CreateUserOutputDto = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp?: string;
};

export interface CreateUser
    extends UseCase<CreateUserInputDto, CreateUserOutputDto | Error> {}
