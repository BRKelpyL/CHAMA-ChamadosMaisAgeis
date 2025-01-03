import { User } from "../../models";

export interface LoadActiveUsersRepository {
    load: () => Promise<User[]>;
}
