import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/models";
import { LoadUserByIdRepository } from "../../../../domain/repositories";

export class LoadUserByIdPrismaRepository implements LoadUserByIdRepository {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient): LoadUserByIdRepository {
        return new LoadUserByIdPrismaRepository(prismaClient);
    }

    public async load(id: string): Promise<User | undefined> {
        const loadedUser = await this.prismaClient.user.findUnique({
            where: {
                id,
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
