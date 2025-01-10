import { LoginUseCase } from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import { LoadUserByEmailPrismaRepository } from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import {
    ComparePasswordBcryptService,
    GenerateTokenJwtService,
} from "../../../../services";
import { LoginHttpController } from "../../../controllers";

export class LoginRoute {
    constructor(HttpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadUserByEmailPrismaRepository =
            LoadUserByEmailPrismaRepository.create(prismaClient);
        const comparePasswordService = new ComparePasswordBcryptService();
        const generateTokenService = new GenerateTokenJwtService();
        const loginUseCase = new LoginUseCase(
            loadUserByEmailPrismaRepository,
            comparePasswordService,
            generateTokenService
        );
        const loginHttpController = new LoginHttpController(loginUseCase);
        HttpServer.on("post", "/user/login", loginHttpController);
    }
}
