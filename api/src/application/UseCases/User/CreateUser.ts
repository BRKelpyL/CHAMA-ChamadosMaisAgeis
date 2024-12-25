import { User } from "../../../domain/models";
import {
    CreateUserRepository,
    LoadUserByNameRepository,
    LoadUserByEmailRepository,
} from "../../../domain/repositories/User";
import {
    ConvertToHashService,
    CreateUser,
    CreateUserInputDto,
    CreateUserOutputDto,
    GenerateIdService,
} from "../../contracts";

export class CreateUserUseCase implements CreateUser {
    constructor(
        private readonly createUserRepository: CreateUserRepository,
        private readonly loadUserByNameRepository: LoadUserByNameRepository,
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
        private readonly generateIdService: GenerateIdService,
        private readonly convertToHashService: ConvertToHashService
    ) {}

    public async execute(
        input: CreateUserInputDto
    ): Promise<CreateUserOutputDto | Error> {
        const { name, email, password, isAdmin, whatsapp } = input;

        const userWithSameName = await this.loadUserByNameRepository.load(name);
        if (userWithSameName) {
            return new Error(`Name ${name} is already in use`);
        }

        const userWithSameEmail = await this.loadUserByEmailRepository.load(
            email
        );
        if (userWithSameEmail) {
            return new Error(`Email ${email} is already in use`);
        }

        const id = this.generateIdService.generate();
        const hashedPassword = await this.convertToHashService.convert(
            password
        );

        let generatedIsAdmin: boolean;

        if (isAdmin === undefined || isAdmin === null) {
            generatedIsAdmin = false;
        } else {
            generatedIsAdmin = isAdmin;
        }

        const deleted = false;

        const user = new User({
            id,
            name,
            email,
            password: hashedPassword,
            isAdmin: generatedIsAdmin,
            whatsapp,
            deleted,
        });

        const createdUser = await this.createUserRepository.save(user);

        if (!createdUser) {
            return new Error("Can not create user");
        }

        return {
            id: createdUser.getId(),
            name: createdUser.getName(),
            email: createdUser.getEmail(),
            password: createdUser.getPassword(),
            isAdmin: createdUser.getIsAdmin(),
            whatsapp: createdUser.getWhatsapp(),
            deleted: createdUser.getDeleted(),
        };
    }
}
