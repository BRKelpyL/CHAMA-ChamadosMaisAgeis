import { User } from "../../../domain/models";
import {
    UpdateUserRepository,
    LoadUserByIdRepository,
} from "../../../domain/repositories/User";
import {
    UpdateUserInputDto,
    UpdateUserOutputDto,
    UpdateUser,
    ConvertToHashService,
} from "../../contracts";

export class UpdateUserUseCase implements UpdateUser {
    constructor(
        private readonly updateUserRepository: UpdateUserRepository,
        private readonly loadUserByIdRepository: LoadUserByIdRepository,
        private readonly loadUserByNameRepository: LoadUserByIdRepository,
        private readonly loadUserByEmailRepository: LoadUserByIdRepository,
        private readonly convertToHashService: ConvertToHashService
    ) {}

    public async execute(
        input: UpdateUserInputDto
    ): Promise<UpdateUserOutputDto | Error> {
        const { id, name, email, password, isAdmin, whatsapp, deleted } = input;

        let hashedPassword;

        const loadedUser = await this.loadUserByIdRepository.load(id);
        if (!loadedUser) {
            return new Error(`User ${id} not found`);
        }

        if (name) {
            const userWithSameName = await this.loadUserByNameRepository.load(
                name
            );
            if (userWithSameName && userWithSameName.getId() !== id) {
                return new Error(`Name ${name} is already in use`);
            }
        }

        if (email) {
            const userWithSameEmail = await this.loadUserByEmailRepository.load(
                email
            );
            if (userWithSameEmail && userWithSameEmail.getId() !== id) {
                return new Error(`Email ${email} is already in use`);
            }
        }

        if (password) {
            hashedPassword = await this.convertToHashService.convert(password);
        }

        const user = new User({
            id,
            name: name ?? loadedUser.getName(),
            email: email ?? loadedUser.getEmail(),
            password: hashedPassword ?? loadedUser.getPassword(),
            isAdmin: isAdmin ?? loadedUser.getIsAdmin(),
            whatsapp: whatsapp ?? loadedUser.getWhatsapp(),
            deleted: deleted ?? loadedUser.getDeleted(),
        });

        const updatedUser = await this.updateUserRepository.update(user);

        if (!updatedUser) {
            return new Error(`User ${id} not updated`);
        }

        return {
            id: updatedUser.getId(),
            name: updatedUser.getName(),
            email: updatedUser.getEmail(),
            password: updatedUser.getPassword(),
            isAdmin: updatedUser.getIsAdmin(),
            whatsapp: updatedUser.getWhatsapp(),
            deleted: updatedUser.getDeleted(),
        };
    }
}
