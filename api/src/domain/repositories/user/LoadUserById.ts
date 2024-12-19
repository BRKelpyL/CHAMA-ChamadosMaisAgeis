import { User } from "../../models";

export interface LoadUserByIdRepository {
    load: (id: string) => Promise<User | undefined>;
}
