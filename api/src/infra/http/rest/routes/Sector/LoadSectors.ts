import { AuthUserUseCase, LoadSectorsUseCase } from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import { LoadSectorsPrismaRepository } from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import { LoadSectorsHttpController } from "../../../controllers";
import { ExtractInfoFromTokenJwtService } from "../../../../services";
import { AuthUserHttpMiddleware } from "../../../middlewares";

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
        const extractInfoFromTokenJwtService =
            new ExtractInfoFromTokenJwtService();        
        const authUserUseCase = new AuthUserUseCase(
            extractInfoFromTokenJwtService
        );
        const authUserHttpMiddleware = new AuthUserHttpMiddleware(
            authUserUseCase
        );
        server.on("get", "/sector/getActive", loadSectorsHttpController, [authUserHttpMiddleware]);
    }
}
