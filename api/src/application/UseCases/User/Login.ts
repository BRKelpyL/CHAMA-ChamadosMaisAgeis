import { LoadUserByEmailRepository } from "../../../domain/repositories/User";
import {
    LoginInputDto,
    LoginOutputDto,
    Login,
    ComparePasswordService,
    GenerateTokenService,
} from "../../contracts";

export class LoginUseCase implements Login {
    constructor(
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
        private readonly comparePasswordService: ComparePasswordService,
        private readonly generateTokenService: GenerateTokenService
    ) {}

    public async execute(
        input: LoginInputDto
    ): Promise<LoginOutputDto | Error> {
        const { email, password } = input;

        const user = await this.loadUserByEmailRepository.load(email);
        if (!user) {
            return new Error(`No account with email ${email}`);
        }

        const isPasswordCorrect = await this.comparePasswordService.compare(
            password,
            user.getPassword()
        );

        if (!isPasswordCorrect) {
            return new Error("Password is incorrect");
        }

        let role = "user";

        if (user.getIsAdmin() === true) {
            role = "admin";
        }

        const token = await this.generateTokenService.generate(
            user.getId(),
            role
        );

        return { token };
    }
}
