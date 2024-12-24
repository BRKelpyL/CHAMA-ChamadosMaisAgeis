import { User } from "../../../domain/models";
import { LoadUsersRepository } from "@/src/domain/repositories/User";
import {
    LoadUsersInputDto,
    LoadUsersOutputDto,
    LoadUsers,
} from "../../contracts";

export class LoadUsersUseCase implements LoadUsers {
    constructor(private readonly loadUsersRepository: LoadUsersRepository) {}

    public async execute(
        input: LoadUsersInputDto
    ): Promise<LoadUsersOutputDto> {
        const users: User[] = await this.loadUsersRepository.load();

        return {
            users: users.map((user) => {
                return {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    isAdmin: user.getIsAdmin(),
                    whatsapp: user.getWhatsapp(),
                };
            }),
        };
    }
}
