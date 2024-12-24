import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/models";
import { LoadUserByNameRepository } from "../../../../domain/repositories";

export class LoadUserByNamePrismaRepository
    implements LoadUserByNameRepository
{
    constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient): LoadUserByNameRepository {
        return new LoadUserByNamePrismaRepository(prismaClient);
    }

    async load(name: string): Promise<User | undefined> {
        const loadedUser = await this.prismaClient.user.findFirst({
            where: {
                name,
            },
        });

        if (!loadedUser) {
            return undefined;
        }

        return new User({
            id: loadedUser.id,
            name: loadedUser.name,
            email: loadedUser.email,
            password: loadedUser.password,
            isAdmin: loadedUser.isAdmin,
            whatsapp: loadedUser.whatsapp ?? undefined,
        });
    }
}
