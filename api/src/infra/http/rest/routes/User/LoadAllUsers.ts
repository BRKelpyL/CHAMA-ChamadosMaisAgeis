import { PrismaClient } from "@prisma/client";
import { LoadAllUsersUseCase } from "../../../../../application/UseCases";
import { LoadAllUsersPrismaRepository } from "../../../../database/repositories";
import { LoadAllUsersHttpController } from "../../../controllers/User";
import { ServerHttpRest } from "../../contracts";

export class LoadAllUsersRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadAllUsersPrismaRepository =
            LoadAllUsersPrismaRepository.create(prismaClient);
        const loadAllUsersUseCase = new LoadAllUsersUseCase(
            loadAllUsersPrismaRepository
        );
        const loadAllUsersHttpController = new LoadAllUsersHttpController(
            loadAllUsersUseCase
        );
        httpServer.on("get", "/user/getAll", loadAllUsersHttpController);
    }
}
