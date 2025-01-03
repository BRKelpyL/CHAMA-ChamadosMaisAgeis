import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/models";
import { LoadActiveUsersRepository } from "../../../../domain/repositories";

export class LoadActiveUsersPrismaRepository
    implements LoadActiveUsersRepository
{
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(
        prismaClient: PrismaClient
    ): LoadActiveUsersRepository {
        return new LoadActiveUsersPrismaRepository(prismaClient);
    }

    public async load(): Promise<User[]> {
        const users = await this.prismaClient.user.findMany({
            where: {
                deleted: false,
            },
        });

        const userList = users.map(
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
