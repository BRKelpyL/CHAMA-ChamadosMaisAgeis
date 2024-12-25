import { PrismaClient } from "@prisma/client";
import { ServiceOrder, ServiceOrderStatus } from "../../../../domain/models";
import { CreateServiceOrderRepository } from "../../../../domain/repositories";

export class CreateServiceOrderPrismaRepository
    implements CreateServiceOrderRepository
{
    constructor(private readonly prisma: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): CreateServiceOrderRepository {
        return new CreateServiceOrderPrismaRepository(prismaClient);
    }

    public async save(
        serviceOrder: ServiceOrder
    ): Promise<ServiceOrder | undefined> {
        const createdServiceOrder = await this.prisma.serviceOrder.create({
            data: {
                id: serviceOrder.getId(),
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

        if (!createdServiceOrder) {
            return undefined;
        }

        return new ServiceOrder({
            id: createdServiceOrder.id,
            title: createdServiceOrder.title,
            description: createdServiceOrder.description,
            toSectorId: createdServiceOrder.toSectorId,
            status: createdServiceOrder.status as ServiceOrderStatus,
            createdAt: createdServiceOrder.createdAt,
            attibutedAt: createdServiceOrder.attributedAt ?? undefined,
            closedAt: createdServiceOrder.closedAt ?? undefined,
            deleted: createdServiceOrder.deleted,
        });
    }
}
