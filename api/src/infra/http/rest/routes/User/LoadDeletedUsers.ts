import { PrismaClient } from "@prisma/client";
import { LoadDeletedUsersUseCase } from "../../../../../application/UseCases";
import { LoadDeletedUsersPrismaRepository } from "../../../../database/repositories";
import { LoadDeletedUsersHttpController } from "../../../controllers/User";
import { ServerHttpRest } from "../../contracts";

export class LoadDeletedUsersRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadDeletedUsersPrismaRepository =
            LoadDeletedUsersPrismaRepository.create(prismaClient);
        const loadUsersUseCase = new LoadDeletedUsersUseCase(
            loadDeletedUsersPrismaRepository
        );
        const loadDeletedUsersHttpController =
            new LoadDeletedUsersHttpController(loadUsersUseCase);

        httpServer.on(
            "get",
            "/user/getDeleted",
            loadDeletedUsersHttpController
        );
    }
}
