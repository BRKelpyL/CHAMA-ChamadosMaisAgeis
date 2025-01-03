import { User } from "../../../domain/models";
import { LoadActiveUsersRepository } from "../../../domain/repositories/User";
import {
    LoadActiveUsersInputDto,
    LoadActiveUsersOutputDto,
    LoadActiveUsers,
} from "../../contracts";

export class LoadActiveUsersUseCase implements LoadActiveUsers {
    constructor(
        private readonly loadUsersRepository: LoadActiveUsersRepository
    ) {}

    public async execute(
        input: LoadActiveUsersInputDto
    ): Promise<LoadActiveUsersOutputDto> {
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
                    deleted: user.getDeleted(),
                };
            }),
        };
    }
}
