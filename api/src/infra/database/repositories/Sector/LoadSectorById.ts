import { PrismaClient } from "@prisma/client";
import { Sector } from "../../../../domain/models";
import { LoadSectorByIdRepository } from "../../../../domain/repositories";

export class LoadSectorByIdPrismaRepository
    implements LoadSectorByIdRepository
{
    constructor(private readonly prisma: PrismaClient) {}

    public static create(prismaClient: PrismaClient): LoadSectorByIdRepository {
        return new LoadSectorByIdPrismaRepository(prismaClient);
    }

    public async load(id: string): Promise<Sector | undefined> {
        const loadedSector = await this.prisma.sector.findFirst({
            where: {
                id,
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
