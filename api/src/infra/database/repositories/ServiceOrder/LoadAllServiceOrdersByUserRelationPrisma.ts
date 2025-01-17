import { PrismaClient } from "@prisma/client";
import { ServiceOrder, ServiceOrderStatus } from "../../../../domain/models";
import { LoadAllServiceOrdersByUserRelationRepository } from "../../../../domain/repositories";

export class LoadAllServiceOrdersByUserRelationPrismaRepository
    implements LoadAllServiceOrdersByUserRelationRepository
{
    constructor(private readonly prisma: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): LoadAllServiceOrdersByUserRelationPrismaRepository {
        return new LoadAllServiceOrdersByUserRelationPrismaRepository(
            prismaClient
        );
    }

    public async load(
        userId: string,
        relation: string
    ): Promise<ServiceOrder[]> {
        const serviceOrders = await this.prisma.serviceOrder.findMany({
            where: {
                UserToServiceOrder: {
                    every: {
                        user: {
                            id: userId,
                        },
                        relation: relation,
                    },
                },
                status: { not: "Fechado" },
                deleted: false,
            },
        });

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
