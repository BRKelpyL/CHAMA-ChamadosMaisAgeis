import { PrismaClient } from "@prisma/client";
import {
    AuthUserUseCase,
    LoadActiveUsersUseCase,
} from "../../../../../application/UseCases";
import { LoadActiveUsersPrismaRepository } from "../../../../database/repositories";
import { LoadActiveUsersHttpController } from "../../../controllers/User";
import { ServerHttpRest } from "../../contracts";
import { AuthUserHttpMiddleware } from "../../../middlewares";
import { ExtractInfoFromTokenJwtService } from "../../../../services";

export class LoadActiveUsersRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadUserPrismaRepository =
            LoadActiveUsersPrismaRepository.create(prismaClient);

        const loadActiveUsersUseCase = new LoadActiveUsersUseCase(
            loadUserPrismaRepository
        );
        const LoadActiveUserHttpController = new LoadActiveUsersHttpController(
            loadActiveUsersUseCase
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
            "get",
            "/user/getActive",
            LoadActiveUserHttpController,
            authUserHttpMiddleware
        );
    }
}
