import { PrismaClient } from "@prisma/client";
import {
    AuthUserUseCase,
    LoadAllServiceOrdersByUserRelationUseCase,
} from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import { LoadAllServiceOrdersByUserRelationPrismaRepository } from "../../../../database/repositories";
import { LoadAllServiceOrdersByUserRelationHttpController } from "../../../controllers";
import { AuthUserHttpMiddleware } from "../../../middlewares";
import { ExtractInfoFromTokenJwtService } from "../../../../services";

export class LoadAllServiceOrdersByUserRelationRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadAllServiceOrdersByUserRelationPrismaRepository =
            LoadAllServiceOrdersByUserRelationPrismaRepository.create(
                prismaClient
            );
        const loadAllServiceOrdersByUserRelationUseCase =
            new LoadAllServiceOrdersByUserRelationUseCase(
                loadAllServiceOrdersByUserRelationPrismaRepository
            );
        const loadAllServiceOrdersByUserRelationHttpController =
            new LoadAllServiceOrdersByUserRelationHttpController(
                loadAllServiceOrdersByUserRelationUseCase
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
            "/serviceOrder/getAllServiceOrdersByUserRelation",
            loadAllServiceOrdersByUserRelationHttpController,
            [authUserHttpMiddleware]
        );
    }
}
