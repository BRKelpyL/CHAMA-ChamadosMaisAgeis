import { UseCase } from "../UseCase";

export type DeleteUserByIdInputDto = {
    id: string;
};

export type DeleteUserByIdOutputDto = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp?: string;
    deleted: boolean;
};

export interface DeleteUserById
    extends UseCase<DeleteUserByIdInputDto, DeleteUserByIdOutputDto | Error> {}
