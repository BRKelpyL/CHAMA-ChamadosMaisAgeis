import { CreateUserUseCase } from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    CreateUserPrismaRepository,
    LoadUserByEmailPrismaRepository,
    LoadUserByNamePrismaRepository,
} from "../../../../database/repositories/User";
import { PrismaClient } from "@prisma/client";
import {
    GenerateIdCryptoUuidService,
    ConvertToHashBcryptService,
} from "../../../../services";
import { CreateUserHttpController } from "../../../controllers/User";

export class CreateUserRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const createUserPrismaRepository =
            CreateUserPrismaRepository.create(prismaClient);
        const loadUserByNamePrismaRepository =
            LoadUserByNamePrismaRepository.create(prismaClient);
        const loadUserByEmailPrismaRepository =
            LoadUserByEmailPrismaRepository.create(prismaClient);
        const generateIdCriptoUuid = new GenerateIdCryptoUuidService();
        const convertToHash = new ConvertToHashBcryptService();

        const createUserUseCase = new CreateUserUseCase(
            createUserPrismaRepository,
            loadUserByNamePrismaRepository,
            loadUserByEmailPrismaRepository,
            generateIdCriptoUuid,
            convertToHash
        );
        const createUserHttpController = new CreateUserHttpController(
            createUserUseCase
        );
        httpServer.on("post", "/user/create", createUserHttpController);
    }
}
