import { LoadSectorsUseCase } from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import { LoadSectorsPrismaRepository } from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import { LoadSectorsHttpController } from "../../../controllers";

export class LoadSectorsRoute {
    constructor(server: ServerHttpRest, prismaClient: PrismaClient) {
        const loadSectorsPrismaRepository =
            LoadSectorsPrismaRepository.create(prismaClient);
        const loadSectorsUseCase = new LoadSectorsUseCase(
            loadSectorsPrismaRepository
        );
        const loadSectorsHttpController = new LoadSectorsHttpController(
            loadSectorsUseCase
        );
        server.on("get", "/sector/getAll", loadSectorsHttpController);
    }
}
