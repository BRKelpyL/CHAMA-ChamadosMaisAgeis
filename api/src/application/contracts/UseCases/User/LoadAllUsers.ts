import { UseCase } from "../UseCase";

export type LoadAllUsersInputDto = void;

export type LoadAllUsersOutputDto = {
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

export interface LoadAllUsers
    extends UseCase<LoadAllUsersInputDto, LoadAllUsersOutputDto | Error> {}
