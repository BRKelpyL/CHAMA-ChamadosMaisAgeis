import { User } from "../../models";

export interface UpdateUserRepository {
    update: (user: User) => Promise<User | undefined>;
}
