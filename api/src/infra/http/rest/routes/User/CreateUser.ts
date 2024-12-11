import { CreateUserUseCase } from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import { CreateUserPrismaRepository } from "../../../../database/repositories/User/CreateUserPrisma";
import { PrismaClient } from "@prisma/client";
import {
    GenerateIdCryptoUuidService,
    ConvertToHashBcryptService,
} from "../../../../services";
import { CreateUserHttpController } from "../../../controllers";

export class CreateUserRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const createUserPrismaRepository =
            CreateUserPrismaRepository.create(prismaClient);
        const generateIdCriptoUuid = new GenerateIdCryptoUuidService();
        const convertToHashService = new ConvertToHashBcryptService();

        const createUserUseCase = new CreateUserUseCase(
            createUserPrismaRepository,
            generateIdCriptoUuid,
            convertToHashService
        );
        const createUserHttpController = new CreateUserHttpController(
            createUserUseCase
        );
        httpServer.on("post", "/user", createUserHttpController);
    }
}
