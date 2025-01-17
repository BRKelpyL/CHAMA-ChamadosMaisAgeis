import { PrismaClient } from "@prisma/client";
import { ServiceOrder, ServiceOrderStatus } from "../../../../domain/models";
import { LoadAllServiceOrdersRepository } from "../../../../domain/repositories";

export class LoadAllServiceOrdersPrismaRepository
    implements LoadAllServiceOrdersRepository
{
    constructor(private readonly prisma: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): LoadAllServiceOrdersRepository {
        return new LoadAllServiceOrdersPrismaRepository(prismaClient);
    }

    public async load(): Promise<ServiceOrder[]> {
        const serviceOrders = await this.prisma.serviceOrder.findMany();

        const serviceOrderList = serviceOrders.map(
            (serviceOrder) =>
                new ServiceOrder({
                    id: serviceOrder.id,
                    title: serviceOrder.title,
                    description: serviceOrder.description,
                    toSectorId: serviceOrder.toSectorId,
                    status: serviceOrder.status as ServiceOrderStatus,
                    createdAt: serviceOrder.createdAt,
                    attibutedAt: serviceOrder.attributedAt ?? undefined,
                    closedAt: serviceOrder.closedAt ?? undefined,
                    deleted: serviceOrder.deleted,
                })
        );
        return serviceOrderList;
    }
}
