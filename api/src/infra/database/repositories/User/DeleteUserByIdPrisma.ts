import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/models";
import { DeleteUserByIdRepository } from "../../../../domain/repositories";

export class DeleteUserByIdPrismaRepository
    implements DeleteUserByIdRepository
{
    constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient): DeleteUserByIdRepository {
        return new DeleteUserByIdPrismaRepository(prismaClient);
    }

    public async delete(id: string): Promise<User | undefined> {
        const deletedUser = await this.prismaClient.user.update({
            where: {
                id,
            },
            data: {
                deleted: true,
            },
        });

        if (!deletedUser) {
            return undefined;
        }

        return new User({
            id: deletedUser.id,
            name: deletedUser.name,
            email: deletedUser.email,
            password: deletedUser.password,
            isAdmin: deletedUser.isAdmin,
            whatsapp: deletedUser.whatsapp ?? undefined,
        });
    }
}
