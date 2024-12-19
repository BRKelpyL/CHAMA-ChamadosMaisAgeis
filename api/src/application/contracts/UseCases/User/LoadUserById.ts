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
};

export interface LoadUserById
    extends UseCase<LoadUserByIdInputDto, LoadUserByIdOutputDto | Error> {}
