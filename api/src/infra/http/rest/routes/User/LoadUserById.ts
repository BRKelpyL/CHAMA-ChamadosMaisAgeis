import { ServerHttpRest } from "../../contracts";
import { PrismaClient } from "@prisma/client";
import {
    AuthUserUseCase,
    LoadUserByIdUseCase,
} from "../../../../../application/UseCases";
import { LoadUserByIdPrismaRepository } from "../../../../database/repositories";
import { LoadUserByIdHttpController } from "../../../controllers";
import { AuthUserHttpMiddleware } from "../../../middlewares";
import { ExtractInfoFromTokenJwtService } from "../../../../services";

export class LoadUserByIdRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadUserByIdPrismaRepository =
            LoadUserByIdPrismaRepository.create(prismaClient);
        const loadUserByIdUseCase = new LoadUserByIdUseCase(
            loadUserByIdPrismaRepository
        );
        const loadUserByIdHttpController = new LoadUserByIdHttpController(
            loadUserByIdUseCase
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
            "/user/getOne",
            loadUserByIdHttpController,
            authUserHttpMiddleware
        );
    }
}
