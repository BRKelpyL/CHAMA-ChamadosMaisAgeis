import {
    AuthUserUseCase,
    DeleteUserByIdUseCase,
} from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    DeleteUserByIdPrismaRepository,
    LoadUserByIdPrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import { DeleteUserByIdHttpController } from "../../../controllers";
import { ExtractInfoFromTokenJwtService } from "../../../../services";
import { AuthUserHttpMiddleware } from "../../../middlewares";

export class DeleteUserByIdRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const deleteUserByIdPrismaRepository =
            DeleteUserByIdPrismaRepository.create(prismaClient);
        const loadUserByIdPrismaRepository =
            LoadUserByIdPrismaRepository.create(prismaClient);
        const deleteUserByIdUseCase = new DeleteUserByIdUseCase(
            deleteUserByIdPrismaRepository,
            loadUserByIdPrismaRepository
        );
        const deleteUserByIdHttpController = new DeleteUserByIdHttpController(
            deleteUserByIdUseCase
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
            "delete",
            "/user/delete",
            deleteUserByIdHttpController,
            [authUserHttpMiddleware]
        );
    }
}
