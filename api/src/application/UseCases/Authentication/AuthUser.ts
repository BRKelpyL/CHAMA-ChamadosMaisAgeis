import {
    AuthUserInputDto,
    AuthUserOutputDto,
    AuthUser,
    ExtractInfoFromTokenService,
} from "../../contracts";

export class AuthUserUseCase implements AuthUser {
    constructor(
        private readonly extractInfoFromTokenService: ExtractInfoFromTokenService
    ) {}

    public async execute(
        input: AuthUserInputDto
    ): Promise<AuthUserOutputDto | Error> {
        const { authorization } = input;

        if (!authorization) {
            return new Error("You need to login first");
        }

        var validToken;

        if (authorization.startsWith("Bearer ")) {
            validToken = authorization.split(" ")[1];
        } else {
            return new Error("The token must be Bearer");
        }

        const extratedInfo = await this.extractInfoFromTokenService.extract(
            validToken
        );

        if (extratedInfo instanceof Error) {
            return extratedInfo;
        }

        return {
            authenticatedUserId: extratedInfo.userId,
            authenticatedUserRole: extratedInfo.role,
        };
    }
}
