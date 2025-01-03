import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/models";
import { LoadAllUsersRepository } from "../../../../domain/repositories";

export class LoadAllUsersPrismaRepository implements LoadAllUsersRepository {
    constructor(private readonly prisma: PrismaClient) {}

    public static create(prismaClient: PrismaClient): LoadAllUsersRepository {
        return new LoadAllUsersPrismaRepository(prismaClient);
    }

    public async load(): Promise<User[]> {
        const users = await this.prisma.user.findMany();

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
