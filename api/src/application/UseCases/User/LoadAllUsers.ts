import { User } from "../../../domain/models";
import { LoadAllUsersRepository } from "../../../domain/repositories/User";
import {
    LoadAllUsers,
    LoadAllUsersInputDto,
    LoadAllUsersOutputDto,
} from "../../contracts";

export class LoadAllUsersUseCase implements LoadAllUsers {
    constructor(
        private readonly loadAllUsersRepository: LoadAllUsersRepository
    ) {}

    public async execute(
        input: LoadAllUsersInputDto
    ): Promise<LoadAllUsersOutputDto> {
        const users: User[] = await this.loadAllUsersRepository.load();

        return {
            users: users.map((user) => {
                return {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    password: "",
                    isAdmin: user.getIsAdmin(),
                    whatsapp: user.getWhatsapp(),
                    deleted: user.getDeleted(),
                };
            }),
        };
    }
}
