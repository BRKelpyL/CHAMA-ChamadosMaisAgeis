import { AuthUserUseCase, CreateSectorUseCase } from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    CreateSectorPrismaRepository,
    LoadSectorByNamePrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import { ExtractInfoFromTokenJwtService, GenerateIdCryptoUuidService } from "../../../../services";
import { CreateSectorHttpController } from "../../../controllers";
import { AuthUserHttpMiddleware } from "../../../middlewares";

export class CreateSectorRoute {
    constructor(server: ServerHttpRest, prismaClient: PrismaClient) {
        const createSectorPrismaRepository =
            CreateSectorPrismaRepository.create(prismaClient);
        const loadSectorByNamePrismaRepository =
            LoadSectorByNamePrismaRepository.create(prismaClient);
        const generateIdCriptoUuid = new GenerateIdCryptoUuidService();

        const createSectorUseCase = new CreateSectorUseCase(
            createSectorPrismaRepository,
            loadSectorByNamePrismaRepository,
            generateIdCriptoUuid
        );
        const createSectorHttpController = new CreateSectorHttpController(
            createSectorUseCase
        );
        const extractInfoFromTokenJwtService =
            new ExtractInfoFromTokenJwtService();

        const authUserUseCase = new AuthUserUseCase(
            extractInfoFromTokenJwtService
        );
        const authUserHttpMiddleware = new AuthUserHttpMiddleware(
            authUserUseCase
        );
        server.on("post", "/sector/create", createSectorHttpController, [authUserHttpMiddleware]);
    }
}
