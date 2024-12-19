import { UpdateUserUseCase } from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    UpdateUserPrismaRepository,
    LoadUserByIdPrismaRepository,
    LoadUserByNamePrismaRepository,
    LoadUserByEmailPrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import { ConvertToHashBcryptService } from "../../../../services";
import { UpdateUserHttpController } from "../../../controllers/User";

export class UpdateUserRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const updateUserPrismaRepository =
            UpdateUserPrismaRepository.create(prismaClient);
        const loadUserByIdPrismaRepository =
            LoadUserByIdPrismaRepository.create(prismaClient);
        const loadUserByNamePrismaRepository =
            LoadUserByNamePrismaRepository.create(prismaClient);
        const loadUserByEmailPrismaRepository =
            LoadUserByEmailPrismaRepository.create(prismaClient);
        const convertToHash = new ConvertToHashBcryptService();

        const loadUserUseCase = new UpdateUserUseCase(
            updateUserPrismaRepository,
            loadUserByIdPrismaRepository,
            loadUserByNamePrismaRepository,
            loadUserByEmailPrismaRepository,
            convertToHash
        );
        const updateUserHttpController = new UpdateUserHttpController(
            loadUserUseCase
        );
        httpServer.on("put", "/user/update", updateUserHttpController);
    }
}