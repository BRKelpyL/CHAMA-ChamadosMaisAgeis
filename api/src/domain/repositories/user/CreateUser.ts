import { User } from "../../models";

export interface CreateUserRepository {
    save: (user: User) => Promise<User>;
}
