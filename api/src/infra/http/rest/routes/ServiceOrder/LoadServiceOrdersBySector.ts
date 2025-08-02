import { PrismaClient } from "@prisma/client";
import {
    AuthUserUseCase,
    LoadServiceOrdersBySectorUseCase,
} from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import { LoadServiceOrdersBySectorPrismaRepository } from "../../../../database/repositories";
import { LoadServiceOrdersBySectorHttpController } from "../../../controllers";
import { ExtractInfoFromTokenJwtService } from "../../../../services";
import { AuthUserHttpMiddleware } from "../../../middlewares";

export class LoadServiceOrdersBySectorRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadServiceOrdersBySectorPrismaRepository =
            LoadServiceOrdersBySectorPrismaRepository.create(prismaClient);
        const loadServiceOrdersBySectorUseCase =
            new LoadServiceOrdersBySectorUseCase(
                loadServiceOrdersBySectorPrismaRepository
            );
        const loadServiceOrdersBySectorHttpController =
            new LoadServiceOrdersBySectorHttpController(
                loadServiceOrdersBySectorUseCase
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
            "post",
            "/serviceOrder/getBySector",
            loadServiceOrdersBySectorHttpController,
            [authUserHttpMiddleware]
        );
    }
}
