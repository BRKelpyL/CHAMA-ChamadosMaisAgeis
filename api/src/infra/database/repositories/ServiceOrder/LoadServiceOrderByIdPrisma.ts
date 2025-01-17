import { PrismaClient } from "@prisma/client";
import { ServiceOrder, ServiceOrderStatus } from "../../../../domain/models";
import { LoadServiceOrderByIdRepository } from "../../../../domain/repositories";

export class LoadServiceOrderByIdPrismaRepository
    implements LoadServiceOrderByIdRepository
{
    constructor(private readonly prisma: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): LoadServiceOrderByIdPrismaRepository {
        return new LoadServiceOrderByIdPrismaRepository(prismaClient);
    }

    public async load(id: string): Promise<ServiceOrder | undefined> {
        const loadedServiceOrder = await this.prisma.serviceOrder.findUnique({
            where: {
                id,
            },
        });

        if (!loadedServiceOrder) {
            return undefined;
        }

        return new ServiceOrder({
            id: loadedServiceOrder.id,
            title: loadedServiceOrder.title,
            description: loadedServiceOrder.description,
            toSectorId: loadedServiceOrder.toSectorId,
            status: loadedServiceOrder.status as ServiceOrderStatus,
            createdAt: loadedServiceOrder.createdAt,
            attibutedAt: loadedServiceOrder.attributedAt ?? undefined,
            closedAt: loadedServiceOrder.closedAt ?? undefined,
            deleted: loadedServiceOrder.deleted,
        });
    }
}
