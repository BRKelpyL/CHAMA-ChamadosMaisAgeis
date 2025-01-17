import { PrismaClient } from "@prisma/client";
import {
    UserToServiceOrder,
    UserToServiceOrderRelation,
} from "../../../../domain/models";
import { CreateUserToServiceOrderRepository } from "../../../../domain/repositories";

export class CreateUserToServiceOrderPrismaRepository
    implements CreateUserToServiceOrderRepository
{
    constructor(private readonly prisma: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): CreateUserToServiceOrderPrismaRepository {
        return new CreateUserToServiceOrderPrismaRepository(prismaClient);
    }

    public async save(
        userToServiceOrder: UserToServiceOrder
    ): Promise<UserToServiceOrder | undefined> {
        const createdUserToServiceOrder =
            await this.prisma.userToServiceOrder.create({
                data: {
                    id: userToServiceOrder.getId(),
                    userId: userToServiceOrder.getUserId(),
                    serviceOrderId: userToServiceOrder.getServiceOrder(),
                    relation: userToServiceOrder.getRelation(),
                    deleted: userToServiceOrder.getDeleted(),
                },
            });
        return new UserToServiceOrder({
            id: createdUserToServiceOrder.id,
            userId: createdUserToServiceOrder.userId,
            serviceOrderId: createdUserToServiceOrder.serviceOrderId,
            relation:
                createdUserToServiceOrder.relation as UserToServiceOrderRelation,
            deleted: createdUserToServiceOrder.deleted,
        });
    }
}
