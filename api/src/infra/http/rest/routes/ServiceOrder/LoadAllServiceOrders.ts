import { PrismaClient } from "@prisma/client";
import {
    AuthUserUseCase,
    LoadAllServiceOrdersUseCase,
} from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import { LoadAllServiceOrdersPrismaRepository } from "../../../../database/repositories";
import { LoadAllServiceOrdersHttpController } from "../../../controllers";
import { AuthUserHttpMiddleware } from "../../../middlewares";
import { ExtractInfoFromTokenJwtService } from "../../../../services";

export class LoadAllServiceOrdersRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadAllServiceOrdersPrismaRepository =
            LoadAllServiceOrdersPrismaRepository.create(prismaClient);
        const loadAllServiceOrdersUseCase = new LoadAllServiceOrdersUseCase(
            loadAllServiceOrdersPrismaRepository
        );
        const loadAllServiceOrdersHttpController =
            new LoadAllServiceOrdersHttpController(loadAllServiceOrdersUseCase);

        const extractInfoFromTokenJwtService =
            new ExtractInfoFromTokenJwtService();
        const authUserUseCase = new AuthUserUseCase(
            extractInfoFromTokenJwtService
        );
        const authUserHttpMiddleware = new AuthUserHttpMiddleware(
            authUserUseCase
        );

        httpServer.on(
            "get",
            "/serviceOrder/getAll",
            loadAllServiceOrdersHttpController,
            [authUserHttpMiddleware]
        );
    }
}
