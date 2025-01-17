import { PrismaClient } from "@prisma/client";
import {
    AuthUserUseCase,
    LoadServiceOrderByIdUseCase,
} from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import { LoadServiceOrderByIdPrismaRepository } from "../../../../database/repositories";
import { LoadServiceOrderByIdHttpController } from "../../../controllers";
import { AuthUserHttpMiddleware } from "../../../middlewares";
import { ExtractInfoFromTokenJwtService } from "../../../../services";

export class LoadServiceOrderByIdRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadServiceOrderByIdPrismaRepository =
            LoadServiceOrderByIdPrismaRepository.create(prismaClient);
        const loadServiceOrderByIdUseCase = new LoadServiceOrderByIdUseCase(
            loadServiceOrderByIdPrismaRepository
        );
        const loadAllServiceOrdersHttpController =
            new LoadServiceOrderByIdHttpController(loadServiceOrderByIdUseCase);

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
            "/serviceOrder/getOne",
            loadAllServiceOrdersHttpController,
            authUserHttpMiddleware
        );
    }
}
