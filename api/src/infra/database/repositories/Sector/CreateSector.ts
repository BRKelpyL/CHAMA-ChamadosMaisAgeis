import { PrismaClient } from "@prisma/client";
import { Sector } from "../../../../domain/models";
import { CreateSectorRepository } from "../../../../domain/repositories";

export class CreateSectorPrismaRepository implements CreateSectorRepository {
    constructor(private readonly prisma: PrismaClient) {}

    public static create(prismaClient: PrismaClient): CreateSectorRepository {
        return new CreateSectorPrismaRepository(prismaClient);
    }

    public async save(sector: Sector): Promise<Sector | undefined> {
        const createdSector = await this.prisma.sector.create({
            data: {
                id: sector.getId(),
                name: sector.getName(),
            },
        });

        if (!createdSector) {
            return undefined;
        }

        return new Sector({
            id: createdSector.id,
            name: createdSector.name,
        });
    }
}
