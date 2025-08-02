import {
    AuthUserUseCase,
    CreateServiceOrderUseCase,
} from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    CreateServiceOrderPrismaRepository,
    CreateUserToServiceOrderPrismaRepository,
    LoadSectorByIdPrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import {
    GenerateIdCryptoUuidService,
    ExtractInfoFromTokenJwtService,
} from "../../../../services";
import { AuthUserHttpMiddleware } from "../../../middlewares";
import { CreateServiceOrderHttpController } from "../../../controllers";

export class CreateServiceOrderRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const createServiceOrderPrismaRepository =
            CreateServiceOrderPrismaRepository.create(prismaClient);
        const createUserToServiceOrderRepository =
            CreateUserToServiceOrderPrismaRepository.create(prismaClient);
        const loadSectorByIdPrismaRepository =
            LoadSectorByIdPrismaRepository.create(prismaClient);
        const generateIdCriptoUuid = new GenerateIdCryptoUuidService();

        const createServiceOrderUseCase = new CreateServiceOrderUseCase(
            createServiceOrderPrismaRepository,
            createUserToServiceOrderRepository,
            loadSectorByIdPrismaRepository,
            generateIdCriptoUuid
        );
        const createServiceOrderHttpController =
            new CreateServiceOrderHttpController(createServiceOrderUseCase);

        const extractInfoFromTokenJwtService =
            new ExtractInfoFromTokenJwtService();
        const authUserUseCase = new AuthUserUseCase(
            extractInfoFromTokenJwtService
        );
        const authUserHttpMiddleware = new AuthUserHttpMiddleware(
            authUserUseCase
        );

        httpServer.on(
            "post",
            "/serviceOrder/create",
            createServiceOrderHttpController,
            [authUserHttpMiddleware]
        );
    }
}
