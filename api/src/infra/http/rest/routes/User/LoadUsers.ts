import { PrismaClient } from "@prisma/client";
import { LoadUsersUseCase } from "../../../../../application/UseCases";
import { LoadUserPrismaRepository } from "../../../../database/repositories";
import { LoadUsersHttpController } from "../../../controllers";
import { ServerHttpRest } from "../../contracts";

export class LoadUsersRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadUserPrismaRepository =
            LoadUserPrismaRepository.create(prismaClient);
        const loadUsersUseCase = new LoadUsersUseCase(loadUserPrismaRepository);
        const LoadUserHttpController = new LoadUsersHttpController(
            loadUsersUseCase
        );

        httpServer.on("get", "/user", LoadUserHttpController);
    }
}
