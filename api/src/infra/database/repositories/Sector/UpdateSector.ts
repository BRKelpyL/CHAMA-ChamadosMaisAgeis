import { PrismaClient } from "@prisma/client";
import { Sector } from "../../../../domain/models";
import { UpdateSectorRepository } from "../../../../domain/repositories";

export class UpdateSectorPrismaRepository implements UpdateSectorRepository {
    constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient): UpdateSectorRepository {
        return new UpdateSectorPrismaRepository(prismaClient);
    }

    public async update(sector: Sector): Promise<Sector | undefined> {
        const updatedSector = await this.prismaClient.sector.update({
            where: {
                id: sector.getId(),
            },
            data: {
                id: sector.getId(),
                name: sector.getName(),
                deleted: sector.getDeleted(),
            },
        });

        if (!updatedSector) {
            return undefined;
        }

        return new Sector({
            id: updatedSector.id,
            name: updatedSector.name,
            deleted: updatedSector.deleted,
        });
    }
}
