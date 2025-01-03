import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/models";
import { LoadUserByEmailRepository } from "../../../../domain/repositories";

export class LoadUserByEmailPrismaRepository
    implements LoadUserByEmailRepository
{
    constructor(private readonly prismaClient: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): LoadUserByEmailRepository {
        return new LoadUserByEmailPrismaRepository(prismaClient);
    }

    async load(email: string): Promise<User | undefined> {
        const loadedUser = await this.prismaClient.user.findFirst({
            where: {
                email,
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
            deleted: loadedUser.deleted,
        });
    }
}
