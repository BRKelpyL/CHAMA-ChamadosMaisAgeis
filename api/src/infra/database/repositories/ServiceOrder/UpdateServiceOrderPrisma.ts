import { PrismaClient } from "@prisma/client";
import { ServiceOrder, ServiceOrderStatus } from "../../../../domain/models";
import { UpdateServiceOrderRepository } from "../../../../domain/repositories";

export class UpdateServiceOrderPrismaRepository
    implements UpdateServiceOrderRepository
{
    constructor(private readonly prisma: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): UpdateServiceOrderPrismaRepository {
        return new UpdateServiceOrderPrismaRepository(prismaClient);
    }

    public async update(
        serviceOrder: ServiceOrder
    ): Promise<ServiceOrder | undefined> {
        const updatedServiceOrder = await this.prisma.serviceOrder.update({
            where: {
                id: serviceOrder.getId(),
            },
            data: {
                title: serviceOrder.getTitle(),
                description: serviceOrder.getDescription(),
                toSectorId: serviceOrder.getToSectorId(),
                status: serviceOrder.getStatus(),
                createdAt: serviceOrder.getCreatedAt(),
                attributedAt: serviceOrder.getAttributedAt(),
                closedAt: serviceOrder.getClosedAt(),
                deleted: serviceOrder.getDeleted(),
            },
        });

        if (!updatedServiceOrder) {
            return undefined;
        }

        return new ServiceOrder({
            id: updatedServiceOrder.id,
            title: updatedServiceOrder.title,
            description: updatedServiceOrder.description,
            toSectorId: updatedServiceOrder.toSectorId,
            status: updatedServiceOrder.status as ServiceOrderStatus,
            createdAt: updatedServiceOrder.createdAt,
            attibutedAt: updatedServiceOrder.attributedAt ?? undefined,
            closedAt: updatedServiceOrder.closedAt ?? undefined,
            deleted: updatedServiceOrder.deleted,
        });
    }
}
