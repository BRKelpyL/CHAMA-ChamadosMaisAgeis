import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/models";
import { LoadDeletedUsersRepository } from "../../../../domain/repositories";

export class LoadDeletedUsersPrismaRepository
    implements LoadDeletedUsersRepository
{
    constructor(private readonly prismaClient: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): LoadDeletedUsersRepository {
        return new LoadDeletedUsersPrismaRepository(prismaClient);
    }

    public async load(): Promise<User[]> {
        const deletedUsers = await this.prismaClient.user.findMany({
            where: {
                deleted: true,
            },
        });

        const userList = deletedUsers.map(
            (user) =>
                new User({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    isAdmin: user.isAdmin,
                    whatsapp: user.whatsapp ?? undefined,
                    deleted: user.deleted,
                })
        );
        return userList;
    }
}
