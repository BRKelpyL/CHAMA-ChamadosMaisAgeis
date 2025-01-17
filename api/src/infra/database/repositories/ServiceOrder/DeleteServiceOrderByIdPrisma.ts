import { PrismaClient } from "@prisma/client";
import { ServiceOrder, ServiceOrderStatus } from "../../../../domain/models";
import { DeleteServiceOrderByIdRepository } from "../../../../domain/repositories";

export class DeleteServiceOrderByIdPrismaRepository
    implements DeleteServiceOrderByIdRepository
{
    constructor(private readonly prisma: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): DeleteServiceOrderByIdPrismaRepository {
        return new DeleteServiceOrderByIdPrismaRepository(prismaClient);
    }

    public async delete(id: string): Promise<ServiceOrder | undefined> {
        const deletedServiceOrder = await this.prisma.serviceOrder.update({
            where: {
                id,
            },
            data: {
                deleted: true,
            },
        });

        if (!deletedServiceOrder) {
            return undefined;
        }

        return new ServiceOrder({
            id: deletedServiceOrder.id,
            title: deletedServiceOrder.title,
            description: deletedServiceOrder.description,
            toSectorId: deletedServiceOrder.toSectorId,
            status: deletedServiceOrder.status as ServiceOrderStatus,
            createdAt: deletedServiceOrder.createdAt,
            attibutedAt: deletedServiceOrder.attributedAt ?? undefined,
            closedAt: deletedServiceOrder.closedAt ?? undefined,
            deleted: deletedServiceOrder.deleted,
        });
    }
}
