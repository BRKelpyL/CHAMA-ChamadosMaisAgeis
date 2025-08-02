import { PrismaClient } from "@prisma/client";
import {
    AuthUserUseCase,
    LoadDeletedUsersUseCase,
} from "../../../../../application/UseCases";
import { LoadDeletedUsersPrismaRepository } from "../../../../database/repositories";
import { LoadDeletedUsersHttpController } from "../../../controllers/User";
import { ServerHttpRest } from "../../contracts";
import { AuthUserHttpMiddleware } from "../../../middlewares";
import { ExtractInfoFromTokenJwtService } from "../../../../services";

export class LoadDeletedUsersRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadDeletedUsersPrismaRepository =
            LoadDeletedUsersPrismaRepository.create(prismaClient);
        const loadUsersUseCase = new LoadDeletedUsersUseCase(
            loadDeletedUsersPrismaRepository
        );
        const loadDeletedUsersHttpController =
            new LoadDeletedUsersHttpController(loadUsersUseCase);

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
            "/user/getDeleted",
            loadDeletedUsersHttpController,
            [authUserHttpMiddleware]
        );
    }
}
