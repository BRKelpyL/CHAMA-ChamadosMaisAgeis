import { UseCase } from "../UseCase";

export type UpdateUserInputDto = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp: string;
};

export type UpdateUserOutputDto = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    whatsapp?: string;
    deleted: boolean;
};

export interface UpdateUser
    extends UseCase<UpdateUserInputDto, UpdateUserOutputDto | Error> {}
