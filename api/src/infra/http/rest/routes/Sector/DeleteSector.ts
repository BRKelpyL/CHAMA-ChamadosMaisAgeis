import { DeleteSectorUseCase } from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    DeleteSectorPrismaRepository,
    LoadSectorByIdPrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import { DeleteSectorHttpController } from "../../../controllers";

export class DeleteSectorRoute {
    constructor(server: ServerHttpRest, prismaClient: PrismaClient) {
        const deleteSectorPrismaRepository =
            DeleteSectorPrismaRepository.create(prismaClient);
        const loadSectorByIdPrismaRepository =
            LoadSectorByIdPrismaRepository.create(prismaClient);

        const deleteSectorUseCase = new DeleteSectorUseCase(
            deleteSectorPrismaRepository,
            loadSectorByIdPrismaRepository
        );
        const deleteSectorHttpController = new DeleteSectorHttpController(
            deleteSectorUseCase
        );
        server.on("delete", "/sector/delete", deleteSectorHttpController);
    }
}
