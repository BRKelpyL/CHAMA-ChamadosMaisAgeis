import { CreateServiceOrderUseCase } from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    CreateServiceOrderPrismaRepository,
    LoadSectorByIdPrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import { GenerateIdCryptoUuidService } from "../../../../services";
import { CreateServiceOrderHttpController } from "../../../controllers";

export class CreateServiceOrderRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const createServiceOrderPrismaRepository =
            CreateServiceOrderPrismaRepository.create(prismaClient);
        const loadSectorByIdPrismaRepository =
            LoadSectorByIdPrismaRepository.create(prismaClient);
        const generateIdCriptoUuid = new GenerateIdCryptoUuidService();

        const createServiceOrderUseCase = new CreateServiceOrderUseCase(
            createServiceOrderPrismaRepository,
            loadSectorByIdPrismaRepository,
            generateIdCriptoUuid
        );
        const createServiceOrderHttpController =
            new CreateServiceOrderHttpController(createServiceOrderUseCase);
        httpServer.on(
            "post",
            "/serviceOrder/create",
            createServiceOrderHttpController
        );
    }
}
