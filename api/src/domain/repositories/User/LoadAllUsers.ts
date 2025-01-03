import { User } from "../../models";

export interface LoadAllUsersRepository {
    load: () => Promise<User[]>;
}
