import { PrismaClient } from "@prisma/client";
import { UserToSector } from "../../../../domain/models";
import { CreateUserToSectorRepository } from "../../../../domain/repositories";

export class CreateUserToSectorPrismaRepository
    implements CreateUserToSectorRepository
{
    constructor(private readonly prisma: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): CreateUserToSectorRepository {
        return new CreateUserToSectorPrismaRepository(prismaClient);
    }

    public async save(
        userToSector: UserToSector
    ): Promise<UserToSector | undefined> {
        const createdUserToSector = await this.prisma.userToSector.create({
            data: {
                id: userToSector.getId(),
                userId: userToSector.getUserId(),
                sectorId: userToSector.getSectorId(),
                deleted: userToSector.getDeleted(),
            },
        });
        if (!createdUserToSector) {
            return undefined;
        }

        return new UserToSector({
            id: createdUserToSector.id,
            userId: createdUserToSector.userId,
            sectorId: createdUserToSector.sectorId,
            deleted: createdUserToSector.deleted,
        });
    }
}
