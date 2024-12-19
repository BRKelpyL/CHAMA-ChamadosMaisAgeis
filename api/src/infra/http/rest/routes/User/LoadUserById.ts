import { ServerHttpRest } from "../../contracts";
import { PrismaClient } from "@prisma/client";
import { LoadUserByIdUseCase } from "../../../../../application/UseCases";
import { LoadUserByIdPrismaRepository } from "../../../../database/repositories";
import { LoadUserByIdHttpController } from "../../../controllers/User";

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
        httpServer.on("get", "/user/getOne", loadUserByIdHttpController);
    }
}
