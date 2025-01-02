import { User } from "../../models";

export interface LoadDeletedUsersRepository {
    load: () => Promise<User[]>;
}
