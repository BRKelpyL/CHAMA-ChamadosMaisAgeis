import { DeleteUserByIdUseCase } from "../../../../../application/UseCases";
import { ServerHttpRest } from "../../contracts";
import {
    DeleteUserByIdPrismaRepository,
    LoadUserByIdPrismaRepository,
} from "../../../../database/repositories";
import { PrismaClient } from "@prisma/client";
import { DeleteUserByIdHttpController } from "../../../controllers/User";

export class DeleteUserByIdRoute {
    constructor(httpServer: ServerHttpRest, prismaClient: PrismaClient) {
        const deleteUserByIdPrismaRepository =
            DeleteUserByIdPrismaRepository.create(prismaClient);
        const loadUserByIdPrismaRepository =
            LoadUserByIdPrismaRepository.create(prismaClient);
        const deleteUserByIdUseCase = new DeleteUserByIdUseCase(
            deleteUserByIdPrismaRepository,
            loadUserByIdPrismaRepository
        );
        const deleteUserByIdHttpController = new DeleteUserByIdHttpController(
            deleteUserByIdUseCase
        );
        httpServer.on("delete", "/user/delete", deleteUserByIdHttpController);
    }
}
