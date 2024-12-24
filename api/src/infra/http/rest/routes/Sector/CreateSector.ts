import { CreateSectorUseCase } from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    CreateSectorPrismaRepository,
    LoadSectorByNamePrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import { GenerateIdCryptoUuidService } from "../../../../services";
import { CreateSectorHttpController } from "../../../controllers";

export class CreateSectorRoute {
    constructor(server: ServerHttpRest, prismaClient: PrismaClient) {
        const createSectorPrismaRepository =
            CreateSectorPrismaRepository.create(prismaClient);
        const loadSectorByNamePrismaRepository =
            LoadSectorByNamePrismaRepository.create(prismaClient);
        const generateIdCriptoUuid = new GenerateIdCryptoUuidService();

        const createSectorUseCase = new CreateSectorUseCase(
            createSectorPrismaRepository,
            loadSectorByNamePrismaRepository,
            generateIdCriptoUuid
        );
        const createSectorHttpController = new CreateSectorHttpController(
            createSectorUseCase
        );
        server.on("post", "/sector/create", createSectorHttpController);
    }
}
