import { PrismaClient } from "@prisma/client";
import { Sector } from "../../../../domain/models";
import { LoadSectorByNameRepository } from "../../../../domain/repositories";

export class LoadSectorByNamePrismaRepository
    implements LoadSectorByNameRepository
{
    constructor(private readonly prisma: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): LoadSectorByNameRepository {
        return new LoadSectorByNamePrismaRepository(prismaClient);
    }

    public async load(name: string): Promise<Sector | undefined> {
        const loadedSector = await this.prisma.sector.findFirst({
            where: {
                name,
            },
        });

        if (!loadedSector) {
            return undefined;
        }

        return new Sector({
            id: loadedSector.id,
            name: loadedSector.name,
            deleted: loadedSector.deleted,
        });
    }
}
