import { LoadUserByIdRepository } from "../../../domain/repositories/user";
import {
    LoadUserByIdInputDto,
    LoadUserByIdOutputDto,
    LoadUserById,
} from "../../contracts";

export class LoadUserByIdUseCase implements LoadUserById {
    constructor(
        private readonly loadUserByIdRepository: LoadUserByIdRepository
    ) {}

    public async execute(
        input: LoadUserByIdInputDto
    ): Promise<LoadUserByIdOutputDto | Error> {
        const { id } = input;
        const user = await this.loadUserByIdRepository.load(id);

        if (!user) {
            return new Error(`User ${id} not found`);
        }

        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            isAdmin: user.getIsAdmin(),
            whatsapp: user.getWhatsapp(),
        };
    }
}
