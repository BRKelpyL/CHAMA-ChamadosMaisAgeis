import { PrismaClient } from "@prisma/client";
import { LoadUsersUseCase } from "../../../../../application/UseCases";
import { LoadUsersPrismaRepository } from "../../../../database/repositories";
import { LoadUsersHttpController } from "../../../controllers/User";
import { ServerHttpRest } from "../../contracts";

export class LoadActiveUsersRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadUserPrismaRepository =
            LoadUsersPrismaRepository.create(prismaClient);

        const loadUsersUseCase = new LoadUsersUseCase(loadUserPrismaRepository);
        const LoadUserHttpController = new LoadUsersHttpController(
            loadUsersUseCase
        );

        httpServer.on("get", "/user/getActive", LoadUserHttpController);
    }
}
