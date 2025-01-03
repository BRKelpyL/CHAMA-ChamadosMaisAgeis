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
        let { id, name, email, password, isAdmin, whatsapp, deleted } = input;

        let userWithSameName;
        let userWithSameEmail;

        const loadedUser = await this.loadUserByIdRepository.load(id);
        if (!loadedUser) {
            return new Error(`User ${id} not found`);
        }

        if (name) {
            userWithSameName = await this.loadUserByNameRepository.load(name);
            if (userWithSameName) {
                if (userWithSameName.getId() !== id) {
                    return new Error(`Name ${name} is already in use`);
                }
            }
        } else {
            name = loadedUser.getName();
        }

        if (email) {
            userWithSameEmail = await this.loadUserByEmailRepository.load(
                email
            );
            if (userWithSameEmail) {
                if (userWithSameEmail.getId() !== id) {
                    return new Error(`Email ${email} is already in use`);
                }
            }
        } else {
            email = loadedUser.getEmail();
        }

        if (password) {
            password = await this.convertToHashService.convert(password);
        } else {
            password = loadedUser.getPassword();
        }

        if (!isAdmin) {
            isAdmin = loadedUser.getIsAdmin();
        }

        if (!whatsapp) {
            if (typeof loadedUser.getWhatsapp() === "string") {
                whatsapp = loadedUser.getWhatsapp();
            } else {
                whatsapp = undefined;
            }
        }

        if (!deleted) {
            deleted = loadedUser.getDeleted();
        }

        const user = new User({
            id,
            name,
            email,
            password,
            isAdmin,
            whatsapp,
            deleted,
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
