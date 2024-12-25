import { UseCase } from "../UseCase";

export type LoadUserByIdInputDto = {
    id: string;
};

export type LoadUserByIdOutputDto = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp?: string;
    deleted: boolean;
};

export interface LoadUserById
    extends UseCase<LoadUserByIdInputDto, LoadUserByIdOutputDto | Error> {}
