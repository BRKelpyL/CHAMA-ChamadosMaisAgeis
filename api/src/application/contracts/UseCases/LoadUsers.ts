import { UseCase } from "./UseCase";

export type LoadUsersInputDto = void;

export type LoadUsersOutputDto = {
    users: {
        id: string;
        name: string;
        email: string;
        password: string;
        isAdmin: boolean;
        whatsapp?: string;
    }[];
};

export interface LoadUsers
    extends UseCase<LoadUsersInputDto, LoadUsersOutputDto> {}
