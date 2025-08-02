import {
    AuthUserUseCase,
    DeleteSectorUseCase,
} from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    DeleteSectorPrismaRepository,
    LoadSectorByIdPrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import { DeleteSectorHttpController } from "../../../controllers";
import { AuthUserHttpMiddleware } from "../../../middlewares";
import { ExtractInfoFromTokenJwtService } from "../../../../services";

export class DeleteSectorRoute {
    constructor(server: ServerHttpRest, prismaClient: PrismaClient) {
        const deleteSectorPrismaRepository =
            DeleteSectorPrismaRepository.create(prismaClient);
        const loadSectorByIdPrismaRepository =
            LoadSectorByIdPrismaRepository.create(prismaClient);

        const deleteSectorUseCase = new DeleteSectorUseCase(
            deleteSectorPrismaRepository,
            loadSectorByIdPrismaRepository
        );
        const deleteSectorHttpController = new DeleteSectorHttpController(
            deleteSectorUseCase
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
            "delete",
            "/sector/delete",
            deleteSectorHttpController,
            [authUserHttpMiddleware]
        );
    }
}
