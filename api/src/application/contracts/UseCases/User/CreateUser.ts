import { UseCase } from "../UseCase";

export type CreateUserInputDto = {
    authenticatedUserId: string;
    authenticatedUserRole: string;
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
    deleted: boolean;
};

export interface CreateUser
    extends UseCase<CreateUserInputDto, CreateUserOutputDto | Error> {}
