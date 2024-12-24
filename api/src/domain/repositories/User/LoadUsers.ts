import { User } from "../../models";

export interface LoadUsersRepository {
    load: () => Promise<User[]>;
}