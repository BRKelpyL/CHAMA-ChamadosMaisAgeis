import { UseCase } from "../UseCase";

export type LoadDeletedUsersInputDto = void;

export type LoadDeletedUsersOutputDto = {
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

export interface LoadDeletedUsers
    extends UseCase<
        LoadDeletedUsersInputDto,
        LoadDeletedUsersOutputDto | Error
    > {}
