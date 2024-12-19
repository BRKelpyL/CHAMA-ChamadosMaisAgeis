import { User } from "../../models";

export interface LoadUserByEmailRepository {
    load: (id: string) => Promise<User | undefined>;
}