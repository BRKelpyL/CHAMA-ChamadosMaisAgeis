import { PrismaClient } from "@prisma/client";
import { Sector } from "../../../../domain/models";
import { DeleteSectorRepository } from "../../../../domain/repositories";

export class DeleteSectorPrismaRepository implements DeleteSectorRepository {
    constructor(private readonly prisma: PrismaClient) {}

    public static create(prismaClient: PrismaClient): DeleteSectorRepository {
        return new DeleteSectorPrismaRepository(prismaClient);
    }

    public async delete(id: string): Promise<Sector | undefined> {
        const deletedSector = await this.prisma.sector.update({
            where: {
                id,
            },
            data: {
                deleted: true,
            },
        });

        if (!deletedSector) {
            return undefined;
        }

        return new Sector({
            id: deletedSector.id,
            name: deletedSector.name,
            deleted: deletedSector.deleted,
        });
    }
}
