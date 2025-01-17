import {
    AddUserToSectorUseCase,
    AuthUserUseCase,
} from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    CreateUserToSectorPrismaRepository,
    LoadUserByIdPrismaRepository,
    LoadSectorByIdPrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import { AddUserToSectorHttpController } from "../../../controllers";
import {
    GenerateIdCryptoUuidService,
    ExtractInfoFromTokenJwtService,
} from "../../../../services";
import { AuthUserHttpMiddleware } from "../../../middlewares";

export class AddUserToSectorRoute {
    constructor(server: ServerHttpRest, prismaClient: PrismaClient) {
        const createUserToSectorPrismaRepository =
            CreateUserToSectorPrismaRepository.create(prismaClient);
        const loadUserByIdPrismaRepository =
            LoadUserByIdPrismaRepository.create(prismaClient);
        const loadSectorByIdPrismaRepository =
            LoadSectorByIdPrismaRepository.create(prismaClient);
        const generateIdService = new GenerateIdCryptoUuidService();
        const extractInfoFromTokenJwtService =
            new ExtractInfoFromTokenJwtService();

        const addUserToSectorUseCase = new AddUserToSectorUseCase(
            createUserToSectorPrismaRepository,
            loadSectorByIdPrismaRepository,
            loadUserByIdPrismaRepository,
            generateIdService
        );
        const addUserToSectorHttpController = new AddUserToSectorHttpController(
            addUserToSectorUseCase
        );

        const authUserUseCase = new AuthUserUseCase(
            extractInfoFromTokenJwtService
        );
        const authUserHttpMiddleware = new AuthUserHttpMiddleware(
            authUserUseCase
        );

        server.on(
            "post",
            "/sector/addUserToSector",
            addUserToSectorHttpController,
            authUserHttpMiddleware
        );
    }
}
