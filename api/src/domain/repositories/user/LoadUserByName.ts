import { User } from "../../models";

export interface LoadUserByNameRepository {
    load: (id: string) => Promise<User | undefined>;
}