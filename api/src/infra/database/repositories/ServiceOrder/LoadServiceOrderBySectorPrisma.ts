import { PrismaClient } from "@prisma/client";
import { ServiceOrder, ServiceOrderStatus } from "../../../../domain/models";
import { LoadServiceOrdersBySectorRepository } from "../../../../domain/repositories";

export class LoadServiceOrdersBySectorPrismaRepository
    implements LoadServiceOrdersBySectorRepository
{
    constructor(private readonly prisma: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): LoadServiceOrdersBySectorPrismaRepository {
        return new LoadServiceOrdersBySectorPrismaRepository(prismaClient);
    }

    public async load(sectorId: string): Promise<ServiceOrder[] | undefined> {
        const loadedServiceOrders = await this.prisma.serviceOrder.findMany({
            where: {
                toSectorId: sectorId,
                status: "Aberto",
            },
        });

        if (!loadedServiceOrders) {
            return undefined;
        }

        const serviceOrderList = loadedServiceOrders.map(
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
