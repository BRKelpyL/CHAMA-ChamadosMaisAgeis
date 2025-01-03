import { PrismaClient } from "@prisma/client";
import { LoadActiveUsersUseCase } from "../../../../../application/UseCases";
import { LoadActiveUsersPrismaRepository } from "../../../../database/repositories";
import { LoadActiveUsersHttpController } from "../../../controllers/User";
import { ServerHttpRest } from "../../contracts";

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

        httpServer.on("get", "/user/getActive", LoadActiveUserHttpController);
    }
}
