import {
    CreateUserUseCase,
    AuthUserUseCase,
} from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    CreateUserPrismaRepository,
    LoadUserByEmailPrismaRepository,
    LoadUserByNamePrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import {
    GenerateIdCryptoUuidService,
    ConvertToHashBcryptService,
    ExtractInfoFromTokenJwtService,
} from "../../../../services";
import { CreateUserHttpController } from "../../../controllers";
import { AuthUserHttpMiddleware } from "../../../middlewares";

export class CreateUserRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const createUserPrismaRepository =
            CreateUserPrismaRepository.create(prismaClient);
        const loadUserByNamePrismaRepository =
            LoadUserByNamePrismaRepository.create(prismaClient);
        const loadUserByEmailPrismaRepository =
            LoadUserByEmailPrismaRepository.create(prismaClient);
        const generateIdCriptoUuid = new GenerateIdCryptoUuidService();
        const convertToHash = new ConvertToHashBcryptService();
        const extractInfoFromTokenJwtService =
            new ExtractInfoFromTokenJwtService();

        const createUserUseCase = new CreateUserUseCase(
            createUserPrismaRepository,
            loadUserByNamePrismaRepository,
            loadUserByEmailPrismaRepository,
            generateIdCriptoUuid,
            convertToHash
        );
        const createUserHttpController = new CreateUserHttpController(
            createUserUseCase
        );

        const authUserUseCase = new AuthUserUseCase(
            extractInfoFromTokenJwtService
        );
        const authUserHttpMiddleware = new AuthUserHttpMiddleware(
            authUserUseCase
        );

        httpServer.on(
            "post",
            "/user/create",
            createUserHttpController,
            authUserHttpMiddleware
        );
    }
}
