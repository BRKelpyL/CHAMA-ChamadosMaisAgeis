import { User } from "../../models";

export interface DeleteUserByIdRepository {
    delete: (id: string) => Promise<User | undefined>
}