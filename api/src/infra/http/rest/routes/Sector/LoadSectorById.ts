import { ServerHttpRest } from "../../contracts";
import { PrismaClient } from "@prisma/client";
import { LoadSectorByIdUseCase } from "../../../../../application/UseCases";
import { LoadSectorByIdPrismaRepository } from "../../../../database/repositories";
import { LoadSectorByIdHttpController } from "../../../controllers";

export class LoadSectorByIdRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const loadSectorByIdPrismaRepository =
            LoadSectorByIdPrismaRepository.create(prismaClient);
        const loadSectorByIdUseCase = new LoadSectorByIdUseCase(
            loadSectorByIdPrismaRepository
        );
        const loadSectorByIdHttpController = new LoadSectorByIdHttpController(
            loadSectorByIdUseCase
        );
        httpServer.on("post", "/sector/getOne", loadSectorByIdHttpController);
    }
}
