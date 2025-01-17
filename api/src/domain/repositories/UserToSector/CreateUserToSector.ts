import { UserToSector } from "../../models";

export interface CreateUserToSectorRepository {
    save(userToSector: UserToSector): Promise<UserToSector | undefined>;
}
