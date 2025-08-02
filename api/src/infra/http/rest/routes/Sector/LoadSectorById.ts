import { ServerHttpRest } from "../../contracts";
import { PrismaClient } from "@prisma/client";
import { AuthUserUseCase, LoadSectorByIdUseCase } from "../../../../../application/UseCases";
import { LoadSectorByIdPrismaRepository } from "../../../../database/repositories";
import { LoadSectorByIdHttpController } from "../../../controllers";
import { ExtractInfoFromTokenJwtService } from "../../../../services";
import { AuthUserHttpMiddleware } from "../../../middlewares";

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
        const extractInfoFromTokenJwtService =
            new ExtractInfoFromTokenJwtService();
        
        const authUserUseCase = new AuthUserUseCase(
            extractInfoFromTokenJwtService
        );
        const authUserHttpMiddleware = new AuthUserHttpMiddleware(
            authUserUseCase
        );
        httpServer.on("post", "/sector/getOne", loadSectorByIdHttpController, [authUserHttpMiddleware]);
    }
}
