import {
    DeleteUserByIdRepository,
    LoadUserByIdRepository,
} from "../../../domain/repositories/User";
import {
    DeleteUserByIdInputDto,
    DeleteUserByIdOutputDto,
    DeleteUserById,
} from "../../contracts/UseCases/User/DeleteUserById";

export class DeleteUserByIdUseCase implements DeleteUserById {
    constructor(
        private readonly deleteUserByIdRepository: DeleteUserByIdRepository,
        private readonly loadUserByIdRepository: LoadUserByIdRepository
    ) {}

    public async execute(
        input: DeleteUserByIdInputDto
    ): Promise<DeleteUserByIdOutputDto | Error> {
        const { id } = input;

        const loadedUser = await this.loadUserByIdRepository.load(id);
        if (!loadedUser) {
            return new Error(`User ${id} not found`);
        }

        const deletedUser = await this.deleteUserByIdRepository.delete(id);

        if (!deletedUser) {
            return new Error("User not deleted");
        }

        return {
            id: deletedUser.getId(),
            name: deletedUser.getName(),
            email: deletedUser.getEmail(),
            password: deletedUser.getPassword(),
            isAdmin: deletedUser.getIsAdmin(),
            whatsapp: deletedUser.getWhatsapp(),
            deleted: deletedUser.getDeleted(),
        };
    }
}
