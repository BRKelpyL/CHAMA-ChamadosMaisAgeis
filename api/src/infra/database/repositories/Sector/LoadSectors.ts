import { PrismaClient } from "@prisma/client";
import { Sector } from "../../../../domain/models";
import { LoadSectorsRepository } from "../../../../domain/repositories";

export class LoadSectorsPrismaRepository implements LoadSectorsRepository {
    constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient): LoadSectorsRepository {
        return new LoadSectorsPrismaRepository(prismaClient);
    }

    public async load(): Promise<Sector[]> {
        const sectors = await this.prismaClient.sector.findMany();

        const sectorList = sectors.map(
            (sector) =>
                new Sector({
                    id: sector.id,
                    name: sector.name,
                    deleted: sector.deleted,
                })
        );
        return sectorList;
    }
}
