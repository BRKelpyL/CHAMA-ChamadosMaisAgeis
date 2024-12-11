import { User } from "../../domain/models";
import { CreateUserRepository } from "../../domain/repositories/user/CreateUser";
import {
    ConvertToHashService,
    CreateUser,
    CreateUserInputDto,
    CreateUserOutputDto,
    GenerateIdService,
} from "../contracts";

export class CreateUserUseCase implements CreateUser {
    constructor(
        private readonly createUserRepository: CreateUserRepository,
        private readonly generateIdService: GenerateIdService,
        private readonly convertToHashService: ConvertToHashService
    ) {}

    public async execute(
        input: CreateUserInputDto
    ): Promise<CreateUserOutputDto> {
        const { name, email, password, isAdmin, whatsapp } = input;

        const id = this.generateIdService.generate();
        const hashedPassword = await this.convertToHashService.convert(
            password
        );

        const user = new User({
            id,
            name,
            email,
            password: hashedPassword,
            isAdmin,
            whatsapp,
        });

        const output = await this.createUserRepository.save(user);

        return {
            id: output.getId(),
            name: output.getName(),
            email: output.getEmail(),
            password: output.getPassword(),
            isAdmin: output.getIsAdmin(),
            whatsapp: output.getWhatsapp(),
        };
    }
}
