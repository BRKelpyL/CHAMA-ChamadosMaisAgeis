import {
    UpdateSectorUseCase,
    AuthUserUseCase,
} from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    UpdateSectorPrismaRepository,
    LoadSectorByNamePrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import { UpdateSectorHttpController } from "../../../controllers";
import { AuthUserHttpMiddleware } from "../../../middlewares";
import { ExtractInfoFromTokenJwtService } from "../../../../services";

export class UpdateSectorRoute {
    constructor(server: ServerHttpRest, prismaClient: PrismaClient) {
        const updateSectorPrismaRepository = new UpdateSectorPrismaRepository(
            prismaClient
        );
        const loadSectorByNamePrismaRepository =
            new LoadSectorByNamePrismaRepository(prismaClient);

        const updateSectorUseCase = new UpdateSectorUseCase(
            updateSectorPrismaRepository,
            loadSectorByNamePrismaRepository
        );

        const updateSectorHttpController = new UpdateSectorHttpController(
            updateSectorUseCase
        );

        const extractInfoFromTokenJwtService =
            new ExtractInfoFromTokenJwtService();

        const authUserUseCase = new AuthUserUseCase(
            extractInfoFromTokenJwtService
        );
        const authUserHttpMiddleware = new AuthUserHttpMiddleware(
            authUserUseCase
        );

        server.on(
            "post",
            "/sector/update",
            updateSectorHttpController,
            [authUserHttpMiddleware]
        );
    }
}
