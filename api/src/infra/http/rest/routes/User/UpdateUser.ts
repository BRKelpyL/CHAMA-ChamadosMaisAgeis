import {
    AuthUserUseCase,
    UpdateUserUseCase,
} from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    UpdateUserPrismaRepository,
    LoadUserByIdPrismaRepository,
    LoadUserByNamePrismaRepository,
    LoadUserByEmailPrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import {
    ConvertToHashBcryptService,
    ExtractInfoFromTokenJwtService,
} from "../../../../services";
import { UpdateUserHttpController } from "../../../controllers/User";
import { AuthUserHttpMiddleware } from "../../../middlewares";

export class UpdateUserRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const updateUserPrismaRepository =
            UpdateUserPrismaRepository.create(prismaClient);
        const loadUserByIdPrismaRepository =
            LoadUserByIdPrismaRepository.create(prismaClient);
        const loadUserByNamePrismaRepository =
            LoadUserByNamePrismaRepository.create(prismaClient);
        const loadUserByEmailPrismaRepository =
            LoadUserByEmailPrismaRepository.create(prismaClient);
        const convertToHash = new ConvertToHashBcryptService();

        const loadUserUseCase = new UpdateUserUseCase(
            updateUserPrismaRepository,
            loadUserByIdPrismaRepository,
            loadUserByNamePrismaRepository,
            loadUserByEmailPrismaRepository,
            convertToHash
        );
        const updateUserHttpController = new UpdateUserHttpController(
            loadUserUseCase
        );

        const extractInfoFromTokenJwtService =
            new ExtractInfoFromTokenJwtService();
        const authUserUseCase = new AuthUserUseCase(
            extractInfoFromTokenJwtService
        );
        const authUserHttpMiddleware = new AuthUserHttpMiddleware(
            authUserUseCase
        );

        httpServer.on(
            "put",
            "/user/update",
            updateUserHttpController,
            [authUserHttpMiddleware]
        );
    }
}
