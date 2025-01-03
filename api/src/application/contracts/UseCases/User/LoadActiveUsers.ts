import { UseCase } from "../UseCase";

export type LoadActiveUsersInputDto = void;

export type LoadActiveUsersOutputDto = {
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

export interface LoadActiveUsers
    extends UseCase<
        LoadActiveUsersInputDto,
        LoadActiveUsersOutputDto | Error
    > {}
