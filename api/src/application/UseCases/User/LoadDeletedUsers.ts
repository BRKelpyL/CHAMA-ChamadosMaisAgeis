import { User } from "../../../domain/models";
import { LoadDeletedUsersRepository } from "../../../domain/repositories/User";
import {
    LoadDeletedUsersInputDto,
    LoadDeletedUsersOutputDto,
    LoadDeletedUsers,
} from "../../contracts";

export class LoadDeletedUsersUseCase implements LoadDeletedUsers {
    constructor(
        private readonly loadDeletedUsersRepository: LoadDeletedUsersRepository
    ) {}

    public async execute(
        input: LoadDeletedUsersInputDto
    ): Promise<LoadDeletedUsersOutputDto> {
        const deletedUsers: User[] =
            await this.loadDeletedUsersRepository.load();

        return {
            users: deletedUsers.map((user) => {
                return {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    isAdmin: user.getIsAdmin(),
                    whatsapp: user.getWhatsapp(),
                    deleted: user.getDeleted(),
                };
            }),
        };
    }
}
