import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/models";
import { LoadUsersRepository } from "../../../../domain/repositories";

export class LoadUsersPrismaRepository implements LoadUsersRepository {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient): LoadUsersRepository {
        return new LoadUsersPrismaRepository(prismaClient);
    }

    public async load(): Promise<User[]> {
        const users = await this.prismaClient.user.findMany();

        const userList = users.map(
            (user) =>
                new User({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    isAdmin: user.isAdmin,
                    whatsapp: user.whatsapp ?? undefined,
                })
        );
        return userList;
    }
}
